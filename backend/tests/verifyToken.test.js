import { jest } from "@jest/globals";

// MOCK FIRST (before importing the file under test)
jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: jest.fn()
  }
}));

// NOW import after mocking
const jwt = (await import("jsonwebtoken")).default;
const { verifyToken } = await import("../middleware/verifyToken.js");

describe("verifyToken middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  test("returns 401 if Authorization header is missing", () => {
    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Authentication failed"
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 if token is invalid", () => {
    req.headers.authorization = "Bearer invalidtoken";

    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Authentication failed"
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next and sets req.user if token is valid", () => {
    process.env.SERVER_NAME = "TestServer";
    req.headers.authorization = "Bearer validtoken";

    jwt.verify.mockReturnValue({
      userId: "123",
      federatedId: "123@TestServer",
      displayName: "Test User",
      serverName: "TestServer",
      image: "img.png",
      role: "user"
    });

    verifyToken(req, res, next);

    expect(req.user).toEqual({
      userId: "123",
      federatedId: "123@TestServer",
      displayName: "Test User",
      serverName: "TestServer",
      image: "img.png",
      role: "user"
    });

    expect(next).toHaveBeenCalled();
  });

});

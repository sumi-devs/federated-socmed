import { createError } from "../utils/error.js";
import Channel from "../models/Channel.js";


export const createChannel = async (req,res,next) =>{
    try{
        const {name,description,rules,visibility,image,followers} = req.body;
        if(!name || !description || !rules || !visibility || !image){
            return next(createError(400, "Missing required fields"));
        }

        const federatedId = `${name}@${req.user.server}`;
        const createdBy = req.user.federatedId;
        const newChannel = new Channel({
            name,
            description,
            rules,
            visibility,
            image,
            federatedId,
            originServer: req.user.server,
            serverName: req.user.server,
            createdBy: createdBy,
            followersCount:  0
        });

        const savedChannel =  await newChannel.save();
        res.status(200).json({
            success: true,
            channel: savedChannel
        });

    }catch(err){
        next(err);
    }
}

export const deleteChannel = async (req,res,next)=>{
    try{
        const ChannelId = req.params.id;
        const channel = await Channel.findById(ChannelId);
        if(!channel){
            return next(createError(404, "Channel not found"));
        }

        await Channel.findByIdAndDelete(ChannelId);
        res.status(200).json({
            success: true,
            message: "Channel deleted successfully"
        });
    }catch(err){
        next(err);
    }
}

export const getChannel = async (req,res,next)=>{
    try{
        const ChannelId = req.params.id;
        const channel = await Channel.findById(ChannelId);
        if(!channel){
            return next(createError(404, "Channel not found"));
        }
        res.status(200).json({
            success: true,
            channel
        });
    }catch(err){
        next(err);
    }
}

export const getAllChannels = async (req,res,next)=>{
    try{    
        const channels = await Channel.find();
        res.status(200).json({
            success: true,
            channels
        });
    }
    catch(err){
        next(err);
    }
}

export const updateChannelDescription = async (req,res,next) =>{
    try{
        const channelId = req.params.id;
        const {description} = req.body;
        if(!description){
            return next(createError(400, "Description is required"));
        }
        const channel = await Channel.findById(channelId);
        if(!channel){
            return next(createError(404, "Channel not found"));
        }   
        channel.description = description;
        const updatedChannel = await channel.save();
        res.status(200).json({
            success: true,
            channel: updatedChannel
        });
    }catch(err){
        next(err);
    }
}

export const updateChannelImage = async (req,res,next) =>{
    try{
        const channelId = req.params.id;
        const {image} = req.body;
        if(!image){
            return next(createError(400, "Image is required"));
        }
        const channel = await Channel.findById(channelId);
        if(!channel){
            return next(createError(404, "Channel not found"));
        }
        channel.image = image;  
        const updatedChannel = await channel.save();
        res.status(200).json({
            success: true,
            channel: updatedChannel
        });
    }catch(err){
        next(err);
    }   
}

export const updateChannelRules = async (req,res,next) =>{
    try{
        const channelId = req.params.id;
        const {rules} = req.body;
        if(!rules || !Array.isArray(rules)){
            return next(createError(400, "Rules must be an array"));
        }   
        const channel = await Channel.findById(channelId);
        if(!channel){
            return next(createError(404, "Channel not found"));
        }
        channel.rules = rules;
        const updatedChannel = await channel.save();
        res.status(200).json({
            success: true,
            channel: updatedChannel
        });
    }catch(err){
        next(err);
    }
}

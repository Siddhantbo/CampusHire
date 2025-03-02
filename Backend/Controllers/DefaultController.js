import express from "express"

//Home Page routing function
const homePage = (req,res)=>{
    res.send("College Placement Management System server is running");
}

export {
    homePage,
}


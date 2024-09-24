const express=require("express")
const router=express.Router();
const MenuItem=require("./../models/MenuItem");

router.post("/",async(req,res)=>{
    try {
    const data=req.body;
    const newMenuItem= new MenuItem(data);
    const responce=await newMenuItem.save();
    console.log("MenuItem saved successfully");
    res.status(200).json(responce)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
});
router.get("/",async(req,res)=>{
    try {
    const data= await MenuItem.find();
    console.log("MenuItem fetched successully");
    res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
});
router.get("/:taste",async(req,res)=>{
    try {
        const taste=req.params.taste;
        
        if(taste=='sweet'|| taste=='sour' ||taste=='spicy'){
            const responce=await MenuItem.find({taste:taste})
            console.log("responce fetched");
            res.status(200).json(responce)
        }else{
           res.status(404).json({error:"invalied work type"}) 
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }

})
router.put("/:id",async(req,res)=>{
    try {
        const menuId=req.params.id;
    const updatedData=req.body;
    const response=await MenuItem.findByIdAndUpdate(menuId,updatedData,{
        new:true,
        runValidator:true,
    });
    if(!response){
        return res.status(404).json({error:"menu item not found"})
    }
    console.log("menu item updated successfully")
    res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }

})
router.delete("/:id",async(req,res)=>{
   try {
    const menuId=req.params.id;
    const response=await MenuItem.findByIdAndDelete(menuId)
    if(!response){
        return res.status(404).json({error:"menu item not found"})
    }
    console.log("menu item deleted successfully")
    res.status(200).json({message:"menu item deleted successfully"})
   } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
   }
})
module.exports=router;

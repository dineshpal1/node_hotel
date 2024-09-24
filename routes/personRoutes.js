const express=require("express");
const router=express.Router()
const Person = require("./../models/Person");
router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      const responce = await newPerson.save();
      console.log("data saved");
      res.status(200).json(responce);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  router.get("/",async(req,res)=>{
      try {
          const data=await Person.find();
          console.log("data fetched successfully")
          res.status(200).json(data);
      } catch (error) {
          console.log(error);
          res.status(500).json({error:"Internal server error"})
      }
  })
  router.get("/:workType",async(req,res)=>{
    try {
        const workType=req.params.workType;
        
        if(workType=='chef'|| workType=='manager' ||workType=='waiter'){
            const responce=await Person.find({work:workType})
            console.log("responce fetched");
            res.status(200).json(responce)
        }else{
           res.status(404).json({error:"invalied work type"}) 
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }

});
router.put("/:id",async(req,res)=>{
    try {
        const personId=req.params.id;
        const updatedData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedData,{
            new:true,
            runValidator:true,
        })
        if(!response){
             res.status(404).json({error:"Person not found"})
        }
        console.log("data updated")
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
});
router.delete('/:id',async(req,res)=>{
    try {
        const personId=req.params.id;
    const response=await Person.findByIdAndDelete(personId)
    if(!response){
        return res.status(404).json({error:"person not found"})
    }
        console.log("data deleted");
        res.status(200).json({message:"person deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})

module.exports=router;
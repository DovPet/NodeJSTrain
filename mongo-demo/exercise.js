const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    price: Number,
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function getAllCourses(){
    return await Course
    .find({isPublished: true})
    .or([
        { price: { $gte: 15 } }, 
        { name: /.*by.* /i }
    ])
    //.find({isPublished: true})
    //.or([{tags: 'frontend', tags: 'backend'}])
    .sort({price: -1})
    .select({name:1, author:1, price:1});
}

async function run(){
const courses = await getAllCourses();
console.log(courses);
}
run(); 

async function updateCourse1(id){
    const course = await Course.findById(id);
    if(!course) {
     console.log('NF')
        return;
    }
    course.isPublished = true;
    course.author = 'Dovs';
   // course.set({ 
    //    isPublished: true,
    //    author: 'Dovs'  
   //  });
 
     const result = await course.save();
     console.log(result);
 }
 
 async function updateCourse2(id){
    const result = await Course.update({_id : id},{
        $set: {
            author: 'Dovs',
            isPublished: false
        }
    });
   
     console.log(result);
 }
 var id = "5b3388ef4b6441aab804e6ab";

 async function removeCourse(id){
    const result = await Course.deleteOne({_id : id});  
     console.log(result);
 }
 var id = "5b3388ef4b6441aab804e6ab";

 removeCourse(id);
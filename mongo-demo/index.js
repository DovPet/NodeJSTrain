const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect', err));

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
       
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
try {
    const result = await course.save();
    console.log(result);
} catch (error) {
    console.log(error.message);
}

}

async function getCourses(){
    const pageNmb = 2;
    const pageSize = 10;

    const courses = await Course
    .find({author: 'Mosh'})
    .skip((pageNmb - 1)*pageSize)
    .limit(pageSize)
    .sort({name: 1})
    .count();
    console.log(courses);
}

async function updateCourse(id){
   const course =  await Course.findById(id);
   if(!course) return;
   course.isPublished = true;
   course.author = 'Dovs';
  // course.set({ 
   //    isPublished: true,
   //    author: 'Dovs'  
  //  });

    const result = await course.save();
    console.log(result);
}

createCourse();
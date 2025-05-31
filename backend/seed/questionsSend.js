import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/question.js";

// Ensure .env loads correctly
dotenv.config();

// Add this for debugging
console.log("🔍 MONGODB_URI from .env:", process.env.MONGODB_URI);

const questionsData = [
  // Software Engineer
  {
    role: "Software Engineer",
    type: "technical",
    question:
      "Explain the difference between an abstract class and an interface in Java.",
  },
  {
    role: "Software Engineer",
    type: "technical",
    question:
      "What are design patterns and why are they important in software engineering?",
  },
  {
    role: "Software Engineer",
    type: "technical",
    question: "Describe the SOLID principles in object-oriented design.",
  },
  {
    role: "Software Engineer",
    type: "technical",
    question: "How do you manage memory in languages like C or C++?",
  },

  // Data Analyst
  {
    role: "Data Analyst",
    type: "technical",
    question:
      "What are the differences between structured and unstructured data?",
  },
  {
    role: "Data Analyst",
    type: "technical",
    question: "Explain the process of data cleaning and why it's important.",
  },
  {
    role: "Data Analyst",
    type: "technical",
    question: "What is a pivot table and how is it useful?",
  },
  {
    role: "Data Analyst",
    type: "technical",
    question: "Describe how you would perform exploratory data analysis (EDA).",
  },

  // Product Manager
  {
    role: "Product Manager",
    type: "technical",
    question: "How do you prioritize features in a product roadmap?",
  },
  {
    role: "Product Manager",
    type: "technical",
    question: "Explain how you gather and incorporate user feedback.",
  },
  {
    role: "Product Manager",
    type: "technical",
    question: "What metrics would you use to measure product success?",
  },
  {
    role: "Product Manager",
    type: "technical",
    question: "Describe your experience with Agile methodologies.",
  },

  // UX Designer
  {
    role: "UX Designer",
    type: "technical",
    question: "What is the difference between UX and UI design?",
  },
  {
    role: "UX Designer",
    type: "technical",
    question: "How do you conduct user research and usability testing?",
  },
  {
    role: "UX Designer",
    type: "technical",
    question: "Explain the concept of user personas and their importance.",
  },
  {
    role: "UX Designer",
    type: "technical",
    question: "What tools do you use for prototyping and wireframing?",
  },

  // Data Scientist
  {
    role: "Data Scientist",
    type: "technical",
    question:
      "What is the difference between supervised and unsupervised learning?",
  },
  {
    role: "Data Scientist",
    type: "technical",
    question: "How would you handle missing data in a dataset?",
  },
  {
    role: "Data Scientist",
    type: "technical",
    question: "Explain the bias-variance tradeoff.",
  },
  {
    role: "Data Scientist",
    type: "technical",
    question: "Describe how a random forest algorithm works.",
  },

  // DevOps Engineer
  {
    role: "DevOps Engineer",
    type: "technical",
    question:
      "What is continuous integration and continuous deployment (CI/CD)?",
  },
  {
    role: "DevOps Engineer",
    type: "technical",
    question: "Explain infrastructure as code (IaC) and its benefits.",
  },
  {
    role: "DevOps Engineer",
    type: "technical",
    question:
      "What are containers and how do they differ from virtual machines?",
  },
  {
    role: "DevOps Engineer",
    type: "technical",
    question: "How do you monitor and maintain system reliability?",
  },

  // Front-End Developer
  {
    role: "Front-End Developer",
    type: "technical",
    question: "What are the key differences between React and Angular?",
  },
  {
    role: "Front-End Developer",
    type: "technical",
    question: "Explain the concept of Virtual DOM in React.",
  },
  {
    role: "Front-End Developer",
    type: "technical",
    question: "How do you optimize website performance?",
  },
  {
    role: "Front-End Developer",
    type: "technical",
    question: "What is the box model in CSS and how does it affect layout?",
  },

  // Back-End Developer
  {
    role: "Back-End Developer",
    type: "technical",
    question: "What is RESTful API design and why is it important?",
  },
  {
    role: "Back-End Developer",
    type: "technical",
    question:
      "How do you handle authentication and authorization in web applications?",
  },
  {
    role: "Back-End Developer",
    type: "technical",
    question: "Explain database normalization and its advantages.",
  },
  {
    role: "Back-End Developer",
    type: "technical",
    question: "What is the difference between SQL and NoSQL databases?",
  },

  // Full-Stack Developer
  {
    role: "Full-Stack Developer",
    type: "technical",
    question: "How do you manage state in a full-stack application?",
  },
  {
    role: "Full-Stack Developer",
    type: "technical",
    question: "Explain how front-end and back-end communicate in a web app.",
  },
  {
    role: "Full-Stack Developer",
    type: "technical",
    question: "What security measures do you implement in a full-stack app?",
  },
  {
    role: "Full-Stack Developer",
    type: "technical",
    question: "Describe the advantages and challenges of using microservices.",
  },

  // Machine Learning Engineer
  {
    role: "Machine Learning Engineer",
    type: "technical",
    question: "What is overfitting and how can you prevent it?",
  },
  {
    role: "Machine Learning Engineer",
    type: "technical",
    question: "Explain gradient descent and its role in training models.",
  },
  {
    role: "Machine Learning Engineer",
    type: "technical",
    question: "What are the differences between classification and regression?",
  },
  {
    role: "Machine Learning Engineer",
    type: "technical",
    question:
      "How do you evaluate the performance of a machine learning model?",
  },

  // Cloud Architect
  {
    role: "Cloud Architect",
    type: "technical",
    question: "What are the benefits of using cloud computing?",
  },
  {
    role: "Cloud Architect",
    type: "technical",
    question: "Explain different cloud service models: IaaS, PaaS, SaaS.",
  },
  {
    role: "Cloud Architect",
    type: "technical",
    question: "How do you ensure security and compliance in the cloud?",
  },
  {
    role: "Cloud Architect",
    type: "technical",
    question: "Describe how you would design a scalable cloud architecture.",
  },
];
  

const seedQuestions = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not defined in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Question.deleteMany();
    await Question.insertMany(questionsData);
    console.log("✅ Questions seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedQuestions();

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import {
  HiOutlineUser,
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineHeart,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineCheck,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi";

const CreatePersona = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    interests: [],
    personality: [],
    background: "",
    goals: [],
    skills: [],
    values: [],
  });

  const steps = [
    {
      id: 1,
      title: "Basic Information",
      icon: HiOutlineUser,
      fields: [
        {
          name: "name",
          label: "Persona Name",
          type: "text",
          placeholder: "Enter a name for your persona",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Describe your persona in a few sentences",
          required: true,
        },
      ],
    },
    {
      id: 2,
      title: "Personality & Interests",
      icon: HiOutlineSparkles,
      fields: [
        {
          name: "personality",
          label: "Personality Traits",
          type: "multiselect",
          options: [
            "Creative",
            "Analytical",
            "Empathetic",
            "Ambitious",
            "Organized",
            "Spontaneous",
            "Introverted",
            "Extroverted",
            "Practical",
            "Idealistic",
          ],
          placeholder: "Select personality traits",
          required: true,
        },
        {
          name: "interests",
          label: "Interests & Hobbies",
          type: "multiselect",
          options: [
            "Reading",
            "Writing",
            "Music",
            "Art",
            "Sports",
            "Technology",
            "Travel",
            "Cooking",
            "Photography",
            "Gaming",
          ],
          placeholder: "Select interests",
          required: true,
        },
      ],
    },
    {
      id: 3,
      title: "Background & Goals",
      icon: HiOutlineLightBulb,
      fields: [
        {
          name: "background",
          label: "Background Story",
          type: "textarea",
          placeholder: "Write a brief background story for your persona",
          required: true,
        },
        {
          name: "goals",
          label: "Goals & Aspirations",
          type: "multiselect",
          options: [
            "Career Growth",
            "Personal Development",
            "Financial Success",
            "Creative Expression",
            "Social Impact",
            "Health & Wellness",
            "Education",
            "Travel",
            "Family",
            "Spiritual Growth",
          ],
          placeholder: "Select goals",
          required: true,
        },
      ],
    },
    {
      id: 4,
      title: "Skills & Values",
      icon: HiOutlineHeart,
      fields: [
        {
          name: "skills",
          label: "Skills & Expertise",
          type: "multiselect",
          options: [
            "Leadership",
            "Communication",
            "Problem Solving",
            "Technical",
            "Creative",
            "Analytical",
            "Project Management",
            "Teamwork",
            "Research",
            "Writing",
          ],
          placeholder: "Select skills",
          required: true,
        },
        {
          name: "values",
          label: "Core Values",
          type: "multiselect",
          options: [
            "Integrity",
            "Creativity",
            "Growth",
            "Community",
            "Innovation",
            "Sustainability",
            "Excellence",
            "Balance",
            "Authenticity",
            "Service",
          ],
          placeholder: "Select values",
          required: true,
        },
      ],
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const personaData = {
        ...formData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "personas"), personaData);
      console.log("Persona created with ID:", docRef.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating persona:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = steps.find((step) => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  step.id !== steps.length ? "flex-1" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.id <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.id < currentStep ? (
                    <HiOutlineCheck className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {step.id !== steps.length && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step.id < currentStep
                        ? "bg-blue-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            {steps.map((step) => (
              <span key={step.id}>{step.title}</span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {currentStepData.title}
              </h2>

              <div className="space-y-6">
                {currentStepData.fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        value={formData[field.name]}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        rows={4}
                      />
                    ) : field.type === "multiselect" ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {field.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleMultiSelect(field.name, option)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              formData[field.name].includes(option)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        value={formData[field.name]}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiOutlineArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                {currentStep === steps.length ? (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <span>Create Persona</span>
                        <HiOutlineCheck className="w-5 h-5" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <span>Next</span>
                    <HiOutlineArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreatePersona; 
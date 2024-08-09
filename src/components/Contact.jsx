import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useForm } from "react-hook-form";

const ValidationError = ({ error }) => {
  return (
    <div className="text-xs text-red-500 mt-1">
      <span className="font-semibold">{error}</span>
    </div>
  );
};

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          to_name: "Binaya",
          from_email: data.email,
          to_email: "bt.binaya@gmail.com",
          message: data.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      alert("I will get back to you as soon as possible.");
    } catch (error) {
      alert("Email could not be sent.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get In Touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 flex flex-col gap-8"
        >
          <div className="flex flex-col">
            <label for="name" className="text-white mb-4">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              {...register("name", {
                required: { value: true, message: "Please provide your name" }
              })}
            />
            {errors.name && <ValidationError error={errors.name.message} />}
          </div>
          <div className="flex flex-col">
            <label for="email" className="text-white mb-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              {...register("email", {
                required: { value: true, message: "Please provide your email" }
              })}
            />
            {errors.email && <ValidationError error={errors.email.message} />}
          </div>
          <div className="flex flex-col">
            <label for="message" className="text-white mb-4">
              Message
            </label>
            <textarea
              type="text"
              id="name"
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              {...register("message", {
                required: { value: true, message: "Please write your message" }
              })}
            />
            {errors.message && (
              <ValidationError error={errors.message.message} />
            )}
          </div>
          {loading ? (
            <button
              type="button"
              className="bg-tertiary py-2 px-6  rounded-md border-none text-white shadow-md "
            >
              Sending...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-tertiary py-2 px-6 rounded-md border-none text-white shadow-md "
            >
              Send
            </button>
          )}
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[330px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

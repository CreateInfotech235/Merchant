import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Gotop from '../../Components_web/Gotop/Gotop';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required')
});

function Contact() {
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Mock API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      resetForm();
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#221F92] sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            We'd love to hear from you. Please fill out this form or shoot us an email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-[#221F92] rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FaPhone className="text-2xl" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-2xl" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>support@example.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-2xl" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>123 Business Street</p>
                  <p>Mumbai, India 400001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <Formik
              initialValues={{ name: '', email: '', subject: '', message: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  <div>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#221F92] focus:border-[#221F92]"
                    />
                    {errors.name && touched.name && (
                      <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#221F92] focus:border-[#221F92]"
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Field
                      name="subject"
                      type="text"
                      placeholder="Subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#221F92] focus:border-[#221F92]"
                    />
                    {errors.subject && touched.subject && (
                      <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#221F92] focus:border-[#221F92]"
                    />
                    {errors.message && touched.message && (
                      <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#221F92] text-white py-3 px-6 rounded-lg hover:bg-[#1a1873] transition-colors duration-200"
                  >
                    Send Message
                  </button>

                  {submitStatus === 'success' && (
                    <p className="text-green-600 text-center">Message sent successfully!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Gotop />
    </div>
  );
}

export default Contact;

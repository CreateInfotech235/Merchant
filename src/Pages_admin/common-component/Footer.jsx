import { useEffect, useState } from "react";
import { getWebFooter, updateWebFooter } from "../webApi/webApi";
import { toast } from "react-toastify";
const Footer = () => {
  const [resources, setResources] = useState([
    {
      name: "",
      link: ""
    }
  ]);
  const [contactUs, setContactUs] = useState(
    [
      {
        data: "",
        type: "EMAIL",
        link: ""
      }
    ]
  );
  const [copyright, setCopyright] = useState({
    text: "",
    link: ""
  });

  const [nowdata, setNowdata] = useState({
    Resources: [],
    ContactUs: {},
    copyright: {}
  });
  const [isLoading, setIsLoading] = useState(true);

  console.log(contactUs, "contactUs");
  console.log(resources, "resources");
  console.log(copyright, "copyright");

  const fetchWebFooter = async () => {
    setIsLoading(true);
    const response = await getWebFooter();
    console.log(response, "response");

    console.log(response?.data?.webFooter, "response");
    setResources(response?.data?.webFooter?.Resources);
    setContactUs(response?.data?.webFooter?.ContactUs);
    setCopyright(response?.data?.webFooter?.copyright);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWebFooter();
  }, []);


  const handleInputChange = (text, index, field) => {
    const updatedResources = [...resources];
    updatedResources[index][field] = text;
    setResources(updatedResources);
  };


  const handleDeleteResource = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedData = {
      Resources: resources.map((resource) => {
        return {
          name: resource.name,
          link: resource.link
        }
      }),
      ContactUs: contactUs.map((contact) => {
        return {
          data: contact.data,
          type: contact.type,
          link: contact.link
        }
      }),
      copyright: copyright
    };
    console.log(updatedData, "updatedData");

    const response = await updateWebFooter(updatedData);
    console.log(response, "response");
    setIsLoading(false);
    if (response?.status === 200) {
      toast.success("Footer updated successfully");
      fetchWebFooter();
    }
    else {
      toast.error(response?.response?.data?.message);
    }
  };


  const handleDeleteContact = (index) => {
    const updatedContactUs = [...contactUs];
    updatedContactUs.splice(index, 1);
    setContactUs(updatedContactUs);
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Footer Settings</h2>

        <form className="grid grid-cols-1 gap-y-0 mb-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-gray-800  text-center col-span-1 font-bold text-2xl">Contact Us</div>
            {
              contactUs && contactUs?.map((contact, index) => (
                <div key={index} className="grid grid-cols-12 gap-4">
                  <div className="col-span-5">
                    <label htmlFor="data">{`enter ${contact.type.toLowerCase()}`}</label>
                    <input type="text" disabled={isLoading} style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "white" }} value={contact.data} onChange={(e) => (setContactUs(prev => prev.map((c, i) => i === index ? { ...c, data: e.target.value } : c)))} placeholder={`enter ${contact.type.toLowerCase()}`} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="col-span-4">
                    <label htmlFor="link">Link</label>
                    <input type="text" disabled={isLoading} style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "white" }} value={contact.link} onChange={(e) => (setContactUs(prev => prev.map((c, i) => i === index ? { ...c, link: e.target.value } : c)))} placeholder={`enter ${contact.type.toLowerCase() == "location" ? "link of location" : contact.type.toLowerCase()}`} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="col-span-2">
                    {/* dropdown of type */}
                    <label htmlFor="type">Type of data</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md" value={contact.type} onChange={(e) => (setContactUs(prev => prev.map((c, i) => i === index ? { ...c, type: e.target.value } : c)))} >
                      {
                        ["EMAIL", "PHONE", "LOCATION"].map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="col-span-1 flex justify-center items-end">
                    <button type="button" className="bg-red-500 text-white p-2 rounded-md" style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "" }} disabled={isLoading} onClick={() => handleDeleteContact(index)}>Remove</button>
                  </div>
                </div>
              ))
            }

            <div className="flex justify-center mt-3">
              <button type="button" className="bg-blue-500 text-white p-2 rounded-md" style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "" }} disabled={isLoading} onClick={() => setContactUs([...contactUs, { data: "", type: "EMAIL", link: "" }])}>Add Contact</button>
            </div>

          </div>
          <div>
            <div className="text-gray-800 mt-6  text-center font-bold text-2xl">Resources</div>
            <div>
              {
                resources && resources?.map((resource, index) => (
                  <div key={index} className="grid grid-cols-11 gap-4">
                    <div className="col-span-5">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        disabled={isLoading}
                        style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "white" }}
                        value={resource.name}
                        onChange={(e) => handleInputChange(e.target.value, index, "name")}
                        placeholder="Name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-5">
                      <label htmlFor="link">Link</label>
                      <input
                        type="text"
                        disabled={isLoading}
                        style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "white" }}
                        value={resource.link}
                        onChange={(e) => handleInputChange(e.target.value, index, "link")}
                        placeholder="Link"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center items-end">
                      <button type="button" className="bg-red-500 text-white p-2 rounded-md" style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "" }} disabled={isLoading} onClick={() => handleDeleteResource(index)}>Remove</button>
                    </div>
                  </div>
                ))
              }
              <div className="flex justify-center mt-3">
                <button type="button" className="bg-blue-500 text-white p-2 rounded-md" style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "" }} disabled={isLoading} onClick={() => setResources([...resources, { name: "", link: "" }])}>Add Resource</button>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <button type="button" className="bg-blue-500 text-white p-2 rounded-md" style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "white" }} disabled={isLoading} onClick={() => setResources([...resources, { name: "", link: "" }])}>Add Resource</button>
            </div>
          </div>

          <div className=" mt-0 mb-3 grid grid-cols-12 gap-4">
            <label htmlFor="copyright" className="col-span-12">Copyright</label>
            <div className="col-span-6">
              <label htmlFor="text">Text</label>
            <input type="text" disabled={isLoading} style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "white" }} value={copyright.text} onChange={(e) => (setCopyright({ ...copyright, text: e.target.value }))} placeholder="Copyright" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="col-span-6">
              <label htmlFor="link">Link</label>
              <input type="text" disabled={isLoading} style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "white" }} value={copyright.link} onChange={(e) => (setCopyright({ ...copyright, link: e.target.value }))} placeholder="Link" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <button type="submit" className="bg-blue-500 col-span-4 text-white p-2 rounded-md" style={{ backgroundColor: isLoading ? "rgba(0,0,0,0.1)" : "" }} disabled={isLoading}>{isLoading ? "Submitting..." : "Submit"}</button>
            <button type="button" className="bg-blue-500 text-white p-2 rounded-md" onClick={() => { setIsLoading(false) }}>Cancel</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Footer;

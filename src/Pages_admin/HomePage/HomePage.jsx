import { useEffect, useState } from 'react';
import { getWebHome } from '../../Components_web/Api/Webapi';
import { updateWebHome } from '../webApi/webApi';
import Inputimg from './inputimg';

const HomePage = () => {
  const [error, setError] = useState(''); // Store error message

  const [webpage, setWebpage] = useState(null);
  const [bakupwebpage, setBakupwebpage] = useState(null);

  // section 1 start
  const [section1status, setSection1status] = useState({
    title: '',
    number: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [section1, setSection1] = useState({
    title: '',
    description: '',
    bgImage: null,
    status: [],
  });


  useEffect(() => {
    if (section1) {
      setWebpage({ ...webpage, header: section1 });
    }
  }, [section1]);

  const fetchData = async () => {
    const data = await getWebHome();
    setWebpage(data);
    setBakupwebpage(data);
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleSection1statussave = () => {
    if (editIndex === null) {
      var data = { ...section1 };
      const status = { title: section1status.title, number: section1status.number };
      data.status.push(status);
      setSection1(data);
    } else {
      const updatedStatus = section1.status.map((item, index) =>
        index === editIndex ? { ...item, title: section1status.title, number: section1status.number } : item
      );
      setSection1({ ...section1, status: updatedStatus });
      setEditIndex(null);
    }
    setSection1status({
      title: '',
      number: '',
    });
  }

  const handleDeletesection1status = (index) => {
    const updatedStatus = section1.status.filter((_, i) => i !== index);
    setSection1({ ...section1, status: updatedStatus });
  }

  const handleEditssection1status = (index) => {
    setEditIndex(index);
    setSection1status({
      title: section1.status[index].title,
      number: section1.status[index].number,
    });
  }




  const handleSection1status = (e) => {
    setSection1status({ ...section1status, [e.target.name]: e.target.value });
  }


  const handleSection1 = (e) => {
    setSection1({ ...section1, [e.target.name]: e.target.value });
  }

  // section 1 end

  // section 2 start

  const [section2, setSection2] = useState({
    title: '',
    data: [],
  });

  const [editIndex2, setEditIndex2] = useState(null);

  const [section2data, setSection2data] = useState({
    title: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (section2) {
      setWebpage({ ...webpage, services: section2 });
    }
  }, [section2]);

  const handleDeletesection2data = (index) => {
    const updatedData = section2.data.filter((_, i) => i !== index);
    setSection2({ ...section2, data: updatedData }); // Update the 'data' array in section2
  };

  const handleEditssection2data = (index) => {
    setEditIndex2(index);
    console.log(index);
    setSection2data(
      {
        title: section2.data[index].title,
        description: section2.data[index].description,
        image: section2.data[index].image,
      }
    )

  }

  const handleSection2datasave = () => {
    if (editIndex2 === null) {
      var data = { ...section2 };
      console.log("data", data);
      const status = { title: section2data.title, image: section2data.image, description: section2data.description };
      data.data.push(status);
      setSection2(data);
    } else {
      const updatedStatus = section2.data.map((item, index) =>
        index === editIndex2 ? { ...item, title: section2data.title, image: section2data.image, description: section2data.description } : item
      );
      setSection2({ ...section2, data: updatedStatus });
      setEditIndex2(null);
    }
    setSection2data({
      title: '',
      image: '',
      description: '',
    });
  }
  // section 2 end








  // section 3 start

  const [section3, setSection3] = useState({
    title: '',
    data: [],
  });

  const [editIndex3, setEditIndex3] = useState(null);

  const [section3data, setSection3data] = useState({
    title: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (section3) {
      setWebpage({ ...webpage, deliverySolutions: section3 });
    }
  }, [section3]);

  const handleDeletesection3data = (index) => {
    const updatedData = section3.data.filter((_, i) => i !== index);
    setSection3({ ...section3, data: updatedData }); // Update the 'data' array in section2
  };

  const handleEditssection3data = (index) => {
    setEditIndex3(index);
    console.log(index);
    setSection3data(
      {
        title: section3.data[index].title,
        description: section3.data[index].description,
        image: section3.data[index].image,
      }
    )

  }

  const handleSection3datasave = () => {
    if (editIndex3 === null) {
      var data = { ...section3 };
      console.log("data", data);
      const status = { title: section3data.title, image: section3data.image, description: section3data.description };
      data.data.push(status);
      setSection3(data);
    } else {
      const updatedStatus = section3.data.map((item, index) =>
        index === editIndex3 ? { ...item, title: section3data.title, image: section3data.image, description: section3data.description } : item
      );
      setSection3({ ...section3, data: updatedStatus });
      setEditIndex3(null);
    }
    setSection3data({
      title: '',
      image: '',
      description: '',
    });
  }
  // section 3 end




  useEffect(() => {
    if (webpage) {
      setSection1(webpage?.header);
      setSection2(webpage?.services);
      setSection3(webpage?.deliverySolutions)
    }

  }, [webpage]);



  const handleSave = async () => {
    if (!section1.bgImage) {
      setError('Please upload an image before saving.');
    } else {
      setError('');
      // alert('Form saved successfully!');
      const response = await updateWebHome(webpage);
      console.log(response);
      if (response.status === 201) {
        // alert('Form saved successfully!');
        fetchData();
      } else {
        alert('Form not saved!');
      }
    }
  };
  console.log("web", webpage);

  useEffect(() => {
    console.log("aaa");
    
    if (JSON.stringify(bakupwebpage) !== JSON.stringify(webpage)) {

      if (window.confirm('your data is not save can you want to save')) {
        handleSave()
      } else {
        setWebpage(bakupwebpage);
      }
    }
  }, [window.location.href]);


  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn rounded-2 mb-3 pb-2 fw-bold"
          style={{
            width: "150px",
            background: "#d65246",
            color: "white",
          }}
          onClick={handleSave}
          disabled={JSON.stringify(bakupwebpage) === JSON.stringify(webpage)}
        >
          Save Changes
        </button>
        <button type="button" className="btn rounded-2 mb-3 pb-2 fw-bold ml-2" style={{ width: "150px", background: "#d65246", color: "white" }} disabled={JSON.stringify(bakupwebpage) === JSON.stringify(webpage)} onClick={() => setWebpage(bakupwebpage)}>
          Reset
        </button>
      </div>

      <div className="container">
        <div className="w-11/12 mx-auto">
          <h1 className="text-3xl font-bold text-center">Home Page</h1>
        </div>
        {/*    section 1 */}
        <div>
          <div className="w-full flex text-2xl font-bold pl-10">
            section 1
          </div>
          <div className="w-full flex">
            <div className="w-1/2">
              <div className="w-11/12 mx-auto">
                <div className="mb-6">
                  <label
                    htmlFor="default-input"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="default-input"
                    name="title"
                    value={section1?.title}
                    onChange={handleSection1}
                    className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-11/12 mx-auto">
                <div className="mb-6">
                  <label
                    htmlFor="default-input-description"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="default-input-description"
                    name="description"
                    value={section1?.description}
                    onChange={handleSection1}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[53px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-1/2">
              <div className="w-11/12 mx-auto">
                <div className="mb-6">
                  <Inputimg path={["bgImage"]} status={section1} setStatus={setSection1} title="Background Image" height="300px" width="100%" />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-11/12 mx-auto flex flex-col justify-between">
                <div className='flex justify-between'>
                  <div className='w-1/3'>
                    <label htmlFor="section1-image" className="block text-sm font-medium text-gray-900 dark:text-white">title</label>
                    <input type="text" name="title" value={section1status?.title} onChange={handleSection1status} className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className='w-1/3'>
                    <label htmlFor="section1-image" className="block text-sm font-medium text-gray-900 dark:text-white">number</label>
                    <input type="text" name="number" value={section1status?.number} onChange={handleSection1status} className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className='w-1/4'>
                    <div className='mt-10'>
                      <button type="button" onClick={handleSection1statussave} className="btn rounded-2 h-[53px] mb-3 pb-2 fw-bold" style={{ width: "150px", background: "#d65246", color: "white" }}>{editIndex === null ? "Add" : "update"}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-11/12 mx-auto flex flex-col justify-between">
                <table className="">
                  <thead style={{ background: "rgb(37, 58, 113)", color: "white", textAlign: "center" }}>
                    <tr>
                      <th >No</th>
                      <th >Title</th>
                      <th >Number</th>
                      <th className='w-1/3' >Action</th>
                    </tr>
                  </thead>
                  <tbody className='bg-white' style={{ textAlign: "center" }}>
                    {section1?.status.map((item, index) => (
                      <tr key={index}>
                        <td >{index + 1}</td> {/* Displaying the serial number */}
                        <td >{item.title}</td>
                        <td >{item.number}</td>
                        <td className='flex justify-evenly items-center p-2'>
                          <button type="button" className="btn rounded-2 " style={{ width: "100px", height: "40px", background: "rgb(214, 82, 70) ", color: "white" }} onClick={() => handleDeletesection1status(index)}>Delete</button>
                          <button type="button" className="btn rounded-2 " style={{ width: "100px", height: "40px", background: "green", color: "white" }} onClick={() => handleEditssection1status(index)}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/*    section 2 */}

        <div>
          <div className="w-full flex text-2xl font-bold pl-10 mt-10">
            section 2
          </div>
          <div className='w-full '>
            <div>
              <div className='w-11/12 mx-auto'>
                <div className='mb-6'>
                  <label htmlFor="section2-title" className="block text-sm font-medium text-gray-900 dark:text-white">Title</label>
                  <input type="text" id="section2-title" name="title" value={section2?.title} onChange={(e) => { setSection2({ ...section2, title: e.target.value }) }} className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
              </div>
            </div>

            <div>
              <div className='w-11/12 mx-auto '>
                <div className='flex justify-between  items-center'>
                  <div className='w-3/12 p-3 '>
                    <Inputimg path={["image"]} status={section2data} setStatus={setSection2data} title="Services icon" height="150px" width="150px" />
                  </div>
                  <div className='w-3/12 p-3'>
                    <label htmlFor="section2-title" className="block text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="section2-title" name="title" value={section2data?.title} onChange={(e) => { setSection2data({ ...section2data, title: e.target.value }) }} className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className='w-4/12 p-3'>
                    <label htmlFor="section2-description" className="block text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" id="section2-description" name="description" value={section2data?.description} onChange={(e) => { setSection2data({ ...section2data, description: e.target.value }) }} className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className='w-2/12 p-3'>
                    <div className='mt-10'>
                      <button className="btn rounded-2 h-[53px]  fw-bold" type='button' style={{ width: "150px", background: "#d65246", color: "white" }} onClick={() => handleSection2datasave()}>{editIndex2 === null ? "Add" : "update"}</button>
                    </div>

                  </div>
                  <div className='w-2/12 p-3'>
                    <div className='mt-10'>
                      <button className="btn rounded-2 h-[53px]  fw-bold" type='button' style={{ width: "150px", background: "#d65246", color: "white" }} onClick={() => {
                        setSection2data({
                          title: '',
                          description: '',
                          image: null,
                        })
                        setEditIndex2(null)
                      }}>cancel</button>
                    </div>
                  </div>
                </div>
                <div className=' w-full'>
                  <table className='w-full'>
                    <thead style={{ background: "rgb(37, 58, 113)", color: "white", textAlign: "center" }}>
                      <tr >
                        <th className='w-1/12' >No</th>
                        <th className='w-1/12' >Image</th>
                        <th className='w-3/12'>Title</th>
                        <th>Description</th>
                        <th className='w-3/12' >Action</th>
                      </tr>
                    </thead>
                    <tbody className='bg-white' style={{ textAlign: "center" }}>
                      {
                        section2?.data.map((item, index) => (
                          <>
                            <tr className=' w-full pb-2 border-b'>
                              <td>{index + 1}</td>
                              <td >
                                <img src={item.image} alt="" style={{ width: "100px", backgroundColor: "black", border: "2px solid white" }} />
                              </td>
                              <td>
                                {item.title}
                              </td>
                              <td>
                                {item.description}
                              </td>
                              <td >
                                <div className='w-full h-full  flex justify-evenly items-center'>
                                  <button type="button" className="btn rounded-2 " style={{ width: "100px", height: "40px", background: "rgb(214, 82, 70) ", color: "white" }} onClick={() => handleDeletesection2data(index)}>Delete</button>
                                  <button type="button" className="btn rounded-2 " style={{ width: "100px", height: "40px", background: "green", color: "white" }} onClick={() => handleEditssection2data(index)}>Edit</button>
                                </div>
                              </td>

                            </tr>
                          </>
                        ))
                      }
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  section 3 */}

        <div >
          <div className="w-full flex text-2xl font-bold pl-10 mt-10">
            section 3
          </div>
          <div className='w-full '>
            <div>
              <div className='w-11/12 mx-auto'>
                <div className='mb-6'>
                  <label htmlFor="section2-title" className="block text-sm font-medium text-gray-900 dark:text-white">Title</label>
                  <input type="text" id="section2-title" name="title" value={section3?.title} onChange={(e) => { setSection3({ ...section3, title: e.target.value }) }} className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
              </div>
            </div>

            <div>
              <div className='w-11/12 mx-auto '>
                <div className='flex justify-between  items-center'>
                  <div className='w-3/12 p-3 '>
                    <Inputimg path={["image"]} status={section3data} setStatus={setSection3data} title="delivery solutions" height="150px" width="150px" />
                  </div>
                  <div className='w-3/12 p-3'>
                    <label htmlFor="section3-title" className="block text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="section3-title" name="title" value={section3data?.title} onChange={(e) => { setSection3data({ ...section3data, title: e.target.value }) }} className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className='w-4/12 p-3'>
                    <label htmlFor="section3-description" className="block text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" id="section3-description" name="description" value={section3data?.description} onChange={(e) => { setSection3data({ ...section3data, description: e.target.value }) }} className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className='w-2/12 p-3'>
                    <div className='mt-10'>
                      <button className="btn rounded-2 h-[53px]  fw-bold" type='button' style={{ width: "150px", background: "#d65246", color: "white" }} onClick={() => handleSection3datasave()}>{editIndex3 === null ? "Add" : "update"}</button>
                    </div>

                  </div>
                  <div className='w-2/12 p-3'>
                    <div className='mt-10'>
                      <button className="btn rounded-2 h-[53px]  fw-bold" type='button' style={{ width: "150px", background: "#d65246", color: "white" }} onClick={() => {
                        setSection3data({
                          title: '',
                          description: '',
                          image: null,
                        })
                        setEditIndex3(null)
                      }}>cancel</button>
                    </div>
                  </div>
                </div>
                <div className=' w-full'>
                  <table className='w-full'>
                    <thead style={{ background: "rgb(37, 58, 113)", color: "white", textAlign: "center" }}>
                      <tr >
                        <th className='w-1/12' >No</th>
                        <th className='w-1/12' >Image</th>
                        <th className='w-3/12'>Title</th>
                        <th>Description</th>
                        <th className='w-3/12' >Action</th>
                      </tr>
                    </thead>
                    <tbody className='bg-white' style={{ textAlign: "center" }}>
                      {
                        section3?.data.map((item, index) => (
                          <>
                            <tr className=' w-full pb-2 border-b'>
                              <td>{index + 1}</td>
                              <td >
                                <img src={item.image} alt="" style={{ width: "100px", backgroundColor: "black", border: "2px solid white" }} />
                              </td>
                              <td>
                                {item.title}
                              </td>
                              <td>
                                {item.description}
                              </td>
                              <td >
                                <div className='w-full h-full  flex justify-evenly items-center'>
                                  <button type="button" className="btn rounded-2 " style={{ width: "100px", height: "40px", background: "rgb(214, 82, 70) ", color: "white" }} onClick={() => handleDeletesection3data(index)}>Delete</button>
                                  <button type="button" className="btn rounded-2 " style={{ width: "100px", height: "40px", background: "green", color: "white" }} onClick={() => handleEditssection3data(index)}>Edit</button>
                                </div>
                              </td>

                            </tr>
                          </>
                        ))
                      }
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  section 4 */}
        <div>
          <div className="w-full flex text-2xl font-bold pl-10 mt-10">
            section 4
          </div>
        </div>


      </div >
    </>
  );
};

export default HomePage;

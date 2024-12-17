import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createInvoiceSettings, getInvoiceSettings, updateInvoiceSettings } from '../../Components_merchant/Api/Invoice';

function InvoiceFormate() {
  const location = useLocation();
  const orderData = location.state?.orderData;
  // console.log("orderData", orderData); 
  const [invoiceSettingsData, setInvoiceSettingsData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [invoiceSettings, setInvoiceSettings] = useState({
    header: 'Delivery Service Invoice',
    footer: 'Thank you for choosing our delivery service!',
    logo: null,
    logoPreview: 'https://placehold.co/200x100/png',
    fromCompanyName: 'Delivery Service Company',
    fromCompanyAddress: '123 Delivery Street',
    fromCompanyCity: 'London, UK',
    orderDetails: {
      orderId: orderData?.orderId || '',
      showOrderNumber: orderData?.showOrderNumber || '-',
      date: orderData?.createdAt || new Date().toISOString(),
      parcelType: orderData?.parcelType || '',
      weight: orderData?.weight || 0,
      parcelsCount: orderData?.parcelsCount || 0,
      pickupDetails: {
        name: orderData?.pickupDetails?.name || '',
        address: orderData?.pickupDetails?.address || '',
        mobileNumber: orderData?.pickupDetails?.mobileNumber || '',
        email: orderData?.pickupDetails?.email || '',
        postCode: orderData?.pickupDetails?.postCode || ''
      },
      deliveryDetails: {
        name: orderData?.deliveryDetails?.name || '',
        address: orderData?.deliveryDetails?.address || '',
        mobileNumber: orderData?.deliveryDetails?.mobileNumber || '',
        email: orderData?.deliveryDetails?.email || '',
        postCode: orderData?.deliveryDetails?.postCode || ''
      },
      charges: orderData?.charges || [],
      totalCharge: orderData?.totalCharge || 0,
      cashCollection: orderData?.cashCollection || 0,
      distance: orderData?.distance || 0,
      duration: orderData?.duration || '',
      status: orderData?.status || ''
    }
  });

  useEffect(() => {
    const fetchInvoiceSettings = async () => {
      const response = await getInvoiceSettings();
      if (response.status) {
        const data = response.data;
        setInvoiceSettingsData(data);
        setInvoiceSettings(prev => ({
          ...prev,
          header: data.header || prev.header,
          footer: data.footer || prev.footer,
          logo: data.logo || prev.logo,
          logoPreview: data.logo || prev.logoPreview,
          fromCompanyName: data.companyName || prev.fromCompanyName,
          fromCompanyAddress: data.address || prev.fromCompanyAddress,
          fromCompanyCity: data.city || prev.fromCompanyCity
        }));
      }
    };
    fetchInvoiceSettings();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setInvoiceSettings((prev) => ({
          ...prev,
          logo: base64String,
          logoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setInvoiceSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const value = {
        companyName: invoiceSettings.fromCompanyName,
        address: invoiceSettings.fromCompanyAddress,
        city: invoiceSettings.fromCompanyCity,
        header: invoiceSettings.header,
        logo: invoiceSettings.logo,
        footer: invoiceSettings.footer,
      }

      let response;
      
      if (!invoiceSettingsData) {
        // If no existing settings, create new
        response = await createInvoiceSettings(value);
        // console.log("response1", response);
      } else {
        // If settings exist, update them
        response = await updateInvoiceSettings(value);
        // console.log("response2", response);
      }

      if (response.status) {
        setIsEditing(false);
      } else {
        throw new Error(response.message || 'Failed to save invoice settings');
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error(error.message || 'Error saving invoice settings');
    }
  };

  const downloadInvoicePDF = async () => {
    try {
      const element = document.querySelector('.invoice-content');
      if (!element) {
        throw new Error('Invoice content element not found');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 20) / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`invoice-${invoiceSettings.orderDetails.orderId || 'download'}.pdf`);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(error.message || 'Error downloading invoice');
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-8 bg-white">
      <div className="mb-8 flex justify-between items-center">
        <div>
          {isEditing ? (
            <input
              type="text"
              value={invoiceSettings.header}
              onChange={(e) => handleInputChange('header', e.target.value)}
              className="text-4xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <h1 className="text-4xl font-bold text-gray-800">{invoiceSettings.header}</h1>
          )}
          <p className="text-gray-500 mt-1">Invoice #{invoiceSettings.orderDetails.showOrderNumber}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
            className={`px-6 py-2 rounded-lg transition-colors ${
              isEditing 
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            {isEditing ? 'Save Changes' : 'Edit Invoice'}
          </button>
          <button
            onClick={downloadInvoicePDF}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="invoice-content space-y-8">
        <div className="flex justify-between items-start border-b border-gray-200 pb-8">
          <div>
            <div className="relative">
              <img 
                src={invoiceSettings.logoPreview}
                alt="Company Logo"
                className="h-16 object-contain"
                style={{ pointerEvents: isEditing ? 'none' : 'auto' }}
              />
              {isEditing && (
                <label className="absolute inset-0 cursor-pointer">
                  <input
                    type="file"
                    onChange={handleLogoChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              )}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">From</h3>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={invoiceSettings.fromCompanyName || "Delivery Service Company"}
                    placeholder="Company Name"
                    name="fromCompanyName"
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    onChange={(e) => handleInputChange('fromCompanyName', e.target.value)}
                  />
                  <input
                    type="text"
                    value={invoiceSettings.fromCompanyAddress || "123 Delivery Street"}
                    placeholder="Company Address"
                    name="fromCompanyAddress"
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    onChange={(e) => handleInputChange('fromCompanyAddress', e.target.value)}
                  />
                  <input
                    type="text"
                    value={invoiceSettings.fromCompanyCity || "London, UK"}
                    placeholder="Company City"
                    name="fromCompanyCity"
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    onChange={(e) => handleInputChange('fromCompanyCity', e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <p className="text-gray-600">{invoiceSettings.fromCompanyName || "Delivery Service Company"}</p>
                  <p className="text-gray-600">{invoiceSettings.fromCompanyAddress || "123 Delivery Street"}</p>
                  <p className="text-gray-600">{invoiceSettings.fromCompanyCity || "London, UK"}</p>
                </>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-gray-600">Date: {new Date(invoiceSettings.orderDetails.date).toLocaleDateString('en-GB')}</p>
            <p className="text-gray-600">Status: <span className="font-semibold">{invoiceSettings.orderDetails.status}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Pickup Details</h3>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Name:</span> {invoiceSettings.orderDetails.pickupDetails.name}</p>
              <p><span className="font-medium">Address:</span> {invoiceSettings.orderDetails.pickupDetails.address}</p>
              <p><span className="font-medium">Phone:</span> {invoiceSettings.orderDetails.pickupDetails.mobileNumber}</p>
              <p><span className="font-medium">Email:</span> {invoiceSettings.orderDetails.pickupDetails.email}</p>
              <p><span className="font-medium">Post Code:</span> {invoiceSettings.orderDetails.pickupDetails.postCode}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Delivery Details</h3>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Name:</span> {invoiceSettings.orderDetails.deliveryDetails.name}</p>
              <p><span className="font-medium">Address:</span> {invoiceSettings.orderDetails.deliveryDetails.address}</p>
              <p><span className="font-medium">Phone:</span> {invoiceSettings.orderDetails.deliveryDetails.mobileNumber}</p>
              <p><span className="font-medium">Email:</span> {invoiceSettings.orderDetails.deliveryDetails.email}</p>
              <p><span className="font-medium">Post Code:</span> {invoiceSettings.orderDetails.deliveryDetails.postCode}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Parcel Information</h3>
          <div className="grid grid-cols-3 gap-6 text-gray-600">
            <div>
              <p className="font-medium">Parcel Type</p>
              <p>{invoiceSettings.orderDetails.parcelType}</p>
            </div>
            <div>
              <p className="font-medium">Weight</p>
              <p>{invoiceSettings.orderDetails.weight} kg</p>
            </div>
            <div>
              <p className="font-medium">Quantity</p>
              <p>{invoiceSettings.orderDetails.parcelsCount} items</p>
            </div>
            <div>
              <p className="font-medium">Distance</p>
              <p>{invoiceSettings.orderDetails.distance} km</p>
            </div>
            <div>
              <p className="font-medium">Duration</p>
              <p>{invoiceSettings.orderDetails.duration}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Charges Breakdown</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold">Description</th>
                <th className="py-3 px-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoiceSettings.orderDetails.charges.map((charge, index) => (
                <tr key={index} className="text-gray-600">
                  <td className="py-3 px-4">{charge.title}</td>
                  <td className="py-3 px-4 text-right">£{charge.charge.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-semibold text-gray-800">
                <td className="py-4 px-4">Total Charges</td>
                <td className="py-4 px-4 text-right">£{invoiceSettings.orderDetails.totalCharge.toFixed(2)}</td>
              </tr>
              <tr className="font-semibold text-gray-800">
                <td className="py-4 px-4">Cash Collection</td>
                <td className="py-4 px-4 text-right">£{invoiceSettings.orderDetails.cashCollection.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center border-t border-gray-200 pt-8 text-gray-500">
          {isEditing ? (
            <input
              type="text"
              value={invoiceSettings.footer}
              onChange={(e) => handleInputChange('footer', e.target.value)}
              className="w-full text-center border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p>{invoiceSettings.footer}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceFormate;

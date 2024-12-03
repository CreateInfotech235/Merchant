import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function InvoiceFormate() {
  const location = useLocation();
  const orderData = location.state?.orderData;
    console.log(orderData);
  // Initial state with order details
  const dummyData = {
    header: 'ACME Shipping & Logistics\n123 Main Street\nLondon, UK EC1A 1BB\nPhone: +44 20 1234 5678\nEmail: info@acmeshipping.com',
    footer: 'Thank you for choosing ACME Shipping & Logistics!\nFor support, call us at +44 20 1234 5678 or email support@acmeshipping.com',
    logo: null,
    logoPreview: 'https://placehold.co/200x100/png',
    orderDetails: {
      orderId: 'ORD-2024-001',
      date: '2024-01-20',
      customerName: 'John Smith',
      customerAddress: '456 Park Avenue\nNew York, NY 10022\nUnited States',
      customerPhone: '+1 212-555-0123',
      customerEmail: 'john.smith@email.com',
      items: [
        {
          description: 'Standard Shipping Package',
          quantity: 2,
          unitPrice: 50,
          total: 100
        },
        {
          description: 'Express Delivery Service',
          quantity: 1,
          unitPrice: 75,
          total: 75
        },
        {
          description: 'Package Insurance',
          quantity: 3,
          unitPrice: 25,
          total: 75
        }
      ],
      subtotal: 250,
      tax: 50,
      shippingCost: 35,
      total: 335
    }
  };

  const [invoiceSettings, setInvoiceSettings] = useState(dummyData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('invoiceSettings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        // Ensure orderDetails exists with default values if missing
        const orderDetails = parsed.orderDetails || {
          orderId: '',
          date: '',
          customerName: '',
          customerAddress: '',
          customerPhone: '',
          customerEmail: '',
          items: [],
          subtotal: 0,
          tax: 0,
          shippingCost: 0,
          total: 0
        };
        setInvoiceSettings({
          ...parsed,
          orderDetails
        });
      }
    } catch (error) {
      console.error('Error loading invoice settings:', error);
      setInvoiceSettings(dummyData); // Fallback to dummy data if error
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrderDetailsChange = (e) => {
    const { name, value } = e.target;
    setInvoiceSettings(prev => ({
      ...prev,
      orderDetails: {
        ...prev.orderDetails,
        [name]: value
      }
    }));
  };

  const handleItemChange = (index, field, value) => {
    setInvoiceSettings(prev => {
      const newItems = [...prev.orderDetails.items];
      newItems[index] = {
        ...newItems[index],
        [field]: value,
        total: field === 'quantity' || field === 'unitPrice' ? 
          value * (field === 'quantity' ? newItems[index].unitPrice : newItems[index].quantity) :
          newItems[index].total
      };

      const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * 0.2; // 20% tax
      const total = subtotal + tax + prev.orderDetails.shippingCost;

      return {
        ...prev,
        orderDetails: {
          ...prev.orderDetails,
          items: newItems,
          subtotal,
          tax,
          total
        }
      };
    });
  };

  const addItem = () => {
    setInvoiceSettings(prev => ({
      ...prev,
      orderDetails: {
        ...prev.orderDetails,
        items: [...prev.orderDetails.items, {
          description: '',
          quantity: 0,
          unitPrice: 0,
          total: 0
        }]
      }
    }));
  };

  const removeItem = (index) => {
    setInvoiceSettings(prev => {
      const newItems = prev.orderDetails.items.filter((_, i) => i !== index);
      const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * 0.2;
      const total = subtotal + tax + prev.orderDetails.shippingCost;

      return {
        ...prev,
        orderDetails: {
          ...prev.orderDetails,
          items: newItems,
          subtotal,
          tax,
          total
        }
      };
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceSettings(prev => ({
          ...prev,
          logo: file,
          logoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('invoiceSettings', JSON.stringify(invoiceSettings));
      toast.success('Invoice format saved successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving invoice format:', error);
      toast.error('Error saving invoice format');
    }
  };

  const downloadInvoicePDF = async () => {
    try {
      const element = document.querySelector('.invoice-content');
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`invoice-${invoiceSettings.orderDetails.orderId}.pdf`);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error downloading invoice');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Invoice Format</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={downloadInvoicePDF}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download Invoice
          </button>
        </div>
      </div>

      <div className="space-y-6 invoice-content">
        {/* Company Info Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold">Company Logo</label>
            {isEditing ? (
              <input 
                type="file" 
                accept="image/*"
                onChange={handleLogoChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              invoiceSettings.logoPreview && (
                <img 
                  src={invoiceSettings.logoPreview} 
                  alt="Company Logo" 
                  className="max-w-[200px]"
                />
              )
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">Company Details</label>
            {isEditing ? (
              <textarea
                name="header"
                value={invoiceSettings.header}
                onChange={handleInputChange}
                className="border p-2 rounded w-full h-32"
                placeholder="Enter company details..."
              />
            ) : (
              <div className="border p-4 rounded bg-gray-50 whitespace-pre-line">
                {invoiceSettings.header}
              </div>
            )}
          </div>
        </div>

        {/* Order Details Section */}
        <div className="border p-4 rounded">
          <h3 className="text-xl font-bold mb-4">Order Details</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Order ID</label>
              {isEditing ? (
                <input
                  type="text"
                  name="orderId"
                  value={invoiceSettings.orderDetails?.orderId || ''}
                  onChange={handleOrderDetailsChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <div className="border p-2 rounded bg-gray-50">
                  {invoiceSettings.orderDetails?.orderId || ''}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2">Date</label>
              {isEditing ? (
                <input
                  type="date"
                  name="date"
                  value={invoiceSettings.orderDetails?.date || ''}
                  onChange={handleOrderDetailsChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <div className="border p-2 rounded bg-gray-50">
                  {invoiceSettings.orderDetails?.date || ''}
                </div>
              )}
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Customer Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="customerName"
                  value={invoiceSettings.orderDetails?.customerName || ''}
                  onChange={handleOrderDetailsChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <div className="border p-2 rounded bg-gray-50">
                  {invoiceSettings.orderDetails?.customerName || ''}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2">Customer Address</label>
              {isEditing ? (
                <textarea
                  name="customerAddress"
                  value={invoiceSettings.orderDetails?.customerAddress || ''}
                  onChange={handleOrderDetailsChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <div className="border p-2 rounded bg-gray-50">
                  {invoiceSettings.orderDetails?.customerAddress || ''}
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-4">
            <h4 className="font-bold mb-2">Items</h4>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Unit Price</th>
                  <th className="border p-2">Total</th>
                  {isEditing && <th className="border p-2">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {invoiceSettings.orderDetails?.items?.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="w-full p-1"
                        />
                      ) : (
                        item.description
                      )}
                    </td>
                    <td className="border p-2">
                      {isEditing ? (
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                          className="w-full p-1"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="border p-2">
                      {isEditing ? (
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                          className="w-full p-1"
                        />
                      ) : (
                        `£${item.unitPrice.toFixed(2)}`
                      )}
                    </td>
                    <td className="border p-2">£{item.total.toFixed(2)}</td>
                    {isEditing && (
                      <td className="border p-2">
                        <button
                          onClick={() => removeItem(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <button
                onClick={addItem}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Add Item
              </button>
            )}
          </div>

          {/* Totals */}
          <div className="grid grid-cols-2 gap-4">
            <div></div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>£{invoiceSettings.orderDetails?.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (20%):</span>
                <span>£{invoiceSettings.orderDetails?.tax?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                {isEditing ? (
                  <input
                    type="number"
                    name="shippingCost"
                    value={invoiceSettings.orderDetails?.shippingCost || 0}
                    onChange={handleOrderDetailsChange}
                    className="border p-1 w-24 text-right"
                  />
                ) : (
                  <span>£{invoiceSettings.orderDetails?.shippingCost?.toFixed(2) || '0.00'}</span>
                )}
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>£{invoiceSettings.orderDetails?.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div>
          <label className="block mb-2 font-semibold">Invoice Footer</label>
          {isEditing ? (
            <textarea
              name="footer"
              value={invoiceSettings.footer}
              onChange={handleInputChange}
              className="border p-2 rounded w-full h-32"
              placeholder="Enter invoice footer text..."
            />
          ) : (
            <div className="border p-4 rounded bg-gray-50 whitespace-pre-line">
              {invoiceSettings.footer}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvoiceFormate;

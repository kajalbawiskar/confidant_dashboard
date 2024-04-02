import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { categoryMap } from '../../data/subcategory';

const AdditionalDetailsStep3 = () => {
  const navigate = useNavigate();
  const categories = Object.keys(categoryMap);
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);

  useEffect(() => {
    if (category) {
      setSubcategories(categoryMap[category] || []);
    }
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubCategoryChange = (selectedOptions) => {
    setSelectedSubcategory(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const subcategoryValues = selectedSubcategory.map(option => option.value);
      const formData = { category, subcategory: subcategoryValues };

      localStorage.setItem('categoryData', JSON.stringify(formData));
      console.log(localStorage.getItem('categoryData'));

      navigate("/SelectgolesStep4");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const optionList = subcategories.map(service => ({ value: service, label: service }));

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="mt-8 space-y-10">
        <div className="rounded-md shadow-sm -space-y-px">
          <label className="block text-gray-700 text-sm font-bold mb-2 pb-2" htmlFor="category">
            Select your business Category
          </label>
          <select
            id="category"
            name="category"
            className="block px-4 py-1.5 w-full text-base text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
            value={category}
            onChange={handleCategoryChange}
          >
            <option>Select a Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label className="block text-gray-700 text-sm font-bold mb-2 pb-2 pt-4" htmlFor="subcategory">
            Select your business Sub-Category
          </label>
          <Select
            className="block px-4 py-3 w-full text-base text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
            options={optionList}
            value={selectedSubcategory}
            onChange={handleSubCategoryChange}
            isMulti
            placeholder="-- Select Subcategories --"
          />
        </div>
      </form>
    </div>
  );
};

export default AdditionalDetailsStep3;

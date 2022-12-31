import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';


function AddProduct() 
{
    const [categorylist, setCategorylist] = useState([]);

    const [productInput, setProduct] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',

        meta_title: '',
        meta_keyword: '',
        meta_desc: '',

        selling_price: '',
        original_price: '',
        quantity: '',
        brand: '',
       // image: '',
        featured: '',
        popular: '',
        status: '',
    });

    

    useEffect(() =>{

        axios.get(`/api/all-category`).then(res=>{
            if(res.data.status === 200)
            {
                setCategorylist(res.data.category);
            }
        });

    }, []);


    const [picture, setPicture] = useState([]);//for image
    const [errorlist, setError] = useState([]);//for image


    const handleInput = (e) =>{
        e.persist();
        setProduct({...productInput,[e.target.name]:e.target.value });
    }

    const handleImage = (e) =>{       
        setPicture({ image: e.target.files[0] });
    }

    const submitProduct = (e) =>{
        e.preventDefault();

        const formData = new FormData();
       
        formData.append('category_id',productInput.category_id);
        formData.append('slug',productInput.slug);
        formData.append('name',productInput.name);
        formData.append('description',productInput.description);

        formData.append('meta_title',productInput.meta_title);
        formData.append('meta_keyword',productInput.meta_keyword);
        formData.append('meta_desc',productInput.meta_desc);

        formData.append('selling_price',productInput.selling_price);
        formData.append('original_price',productInput.original_price);
        formData.append('quantity',productInput.quantity);
        formData.append('brand',productInput.brand);
        formData.append('featured',productInput.featured);
        formData.append('image', picture.image);
        formData.append('popular',productInput.popular);
        formData.append('status',productInput.status);
    

        axios.post(`/api/store-product`, formData).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,'success');
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.errors);
            }
        });
    }

    return(
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>AddProduct
                        <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProduct} encType="multipart/form-data">                   
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Others Details</button>
                            </li>          
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                            
                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    {/* onChange={handleInput} value */}
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                        <option>Select Category</option>
                                        {                              
                                            categorylist.map((item)=>{
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{errorlist.category_id}</small>
                                </div> 
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug"  onChange={handleInput} value={productInput.slug} placeholder="Custom URL" className="form-control" />  
                                    <small className="text-danger">{errorlist.slug}</small>
                                </div> 
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name"  onChange={handleInput} value={productInput.name} placeholder="Custom URL" className="form-control" />                          
                                    <small className="text-danger">{errorlist.name}</small>
                                </div> 
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description"  onChange={handleInput} value={productInput.small_desc} className="form-control"></textarea>
                                    {/* <small className="text-danger">{errorlist.description}</small>                                     */}
                                </div> 

                            </div>
                            <div className="tab-pane card-body border fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title"  onChange={handleInput} value={productInput.meta_title} className="form-control" />
                                    <small className="text-danger">{errorlist.meta_title}</small>    
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta keywords</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_desc" onChange={handleInput} value={productInput.meta_desc} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Selling Price</label>
                                        <input name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                        <small className="text-danger">{errorlist.selling_price}</small>   
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Original price</label>
                                        <input name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
                                        <small className="text-danger">{errorlist.original_price}</small>  
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input type="text" name="quantity" onChange={handleInput} value={productInput.quantity} className="form-control" />
                                        <small className="text-danger">{errorlist.brand}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Brand</label>
                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
                                        <small className="text-danger">{errorlist.brand}</small>   
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        <small className="text-danger">{errorlist.image}</small>  
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Featured (Checked-shown)</label>
                                        <input type="checkbox" name="featured" onChange={handleInput} value={productInput.featured} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Popular (checked-shown)</label>
                                        <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Status (Checked-hidden)</label>
                                        <input type="checkbox" name="status" onChange={handleInput} value={productInput.status} className="w-50 h-50" />
                                    </div>
                                </div>
                            </div>           
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>
                    </form>    
                </div>
            </div>           
        </div>
      
    )
}

export default AddProduct;
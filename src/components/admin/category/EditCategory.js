import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';


function EditCategory(props) 
{  
    const history = useHistory();
    const [categoryInput, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{

        var category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setCategory(res.data.category);
            }
            else if(res.data.status === 404)
            {
                swal("error",res.data.message,"error");
                history.push('/admin/view-category');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    
    const handleInput = (e) =>{
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value });
    }

    if(loading)
    {
        return <h4>Loading Category...</h4>
    }

    return(
        <div className="container-fluid px-4">
            <h1 className="mt-4">Edit Category
                <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">BACK</Link>
            </h1>

            <form>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">SEO Tags</button>
                    </li>   
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="form-group mb-3">
                            <label>Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug}  className="form-control" />
                            {/* <span>{categoryInput.error_list.slug}</span> */}
                        </div>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                            {/* <span>{categoryInput.error_list.name}</span> */}
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Status</label>
                            <input type="checkbox" name="status" />
                        </div>
                    </div>                  
                    <div className="tab-pane card-body border fade" id="seo" role="tabpanel" aria-labelledby="seo-tags-tab">                  
                        <div className="form-group mb-3">
                            <label>Meta Title</label>
                            <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" />
                            {/* <span>{categoryInput.error_list.meta_title}</span>                  */}
                        </div>
                        <div className="form-group mb-3">
                            <label>Meta keywords</label>
                            <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Meta Description</label>
                            <textarea name="meta_desc" onChange={handleInput} value={categoryInput.meta_desc} className="form-control"></textarea>
                        </div>
                    </div>
                </div>                
                <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>                
            </form>
        </div>
    )
}

export default EditCategory;
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';


function ViewProduct() {

    const[loading, setLoading] = useState(true);
    const[productlist, setProductlist] = useState([]);

    useEffect(() =>{

        document.title = "View Product";

        axios.get('/api/view-product').then(res=>{
            //console.log(res.data.category);
            if(res.status === 200)
            {
                setProductlist(res.data.product)
            }
            setLoading(false);
        });

    }, []);


    //delete
    const deleteProduct = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-product/${id}`).then(res =>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Success",res.data.message,"success");
                thisClicked.innerText = "Delete";
            }
        });
    }


    var viewproduct_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading Product...</h4>
    }
    else
    {        
        var ProdStatus = '';
        viewproduct_HTMLTABLE = productlist.map((item) =>{
            if(item.status === '0')
            {
                ProdStatus = 'Shown';
            } 
            else if(item.status === '1')
            {
                ProdStatus = 'Hidden';
            }  
            return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.category.name}</td>           
                        <td>{item.name}</td>
                        <td>{item.selling_price}</td>
                        <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt="" /></td>
                        <td>
                            <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                        </td>     
                        <td>
                           {ProdStatus}
                        </td>             
                    </tr>
                )
        });
    }



    return(
        <div className="container px-4">
            <div className="card">
                <div className="card-header">
                    <h4>Product List
                        <Link to="/admin/add-product" className="btn btn-success btn-sm float-end">Add Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category</th>
                                    <th>Name</th>
                                    <th>Selling Price</th>
                                    <th>Image</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewproduct_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;
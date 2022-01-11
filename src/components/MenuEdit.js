import React, { Fragment, useState } from 'react'

const MenuEdit = ({ menu }) => {
    const [name, setName] = useState(menu.name);
    const [description, setDescription] = useState(menu.description);
    const [price, setPrice] = useState(menu.price);
    const [type, setType] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { name, description, price, type };
            await fetch(`http://localhost:5000/api/menu/${menu.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${menu.id}`}>
            Edit
            </button>

            <div className="modal" id={`id${menu.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Menu</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => {
                            setName(menu.name);
                            setDescription(menu.description);
                            setPrice(menu.price);
                            setType(menu.type)
                        }}>&times;</button>
                    </div>

                    <div class="modal-body">
                        <label>Nama Menu</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
                        <label className='mt-1'>Deskripsi</label>
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <label className='mt-1'>Harga</label>
                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        <label className='mt-1'>Tipe</label>
                        <select className='form-control custom-select' value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="" disabled>Pilih tipe..</option>
                            <option value="Makanan">Makanan</option>
                            <option value="Minuman">Minuman</option>
                        </select>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(e) => onSubmitForm(e)}>Edit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {
                            setName(menu.name);
                            setDescription(menu.description);
                            setPrice(menu.price);
                            setType(menu.type)
                        }}>Close</button>
                    </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default MenuEdit;
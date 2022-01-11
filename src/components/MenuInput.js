import React, { Fragment, useState } from 'react';

const MenuInput = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { name, description, price, type };
            await fetch("http://localhost:5000/api/menu", {
                method: "POST",
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
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
            Tambah Menu
            </button>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Tambah Menu</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => {
                            setName("");
                            setDescription("");
                            setPrice("");
                            setType("Pilih tipe..")
                        }}>&times;</button>
                    </div>

                    <div class="modal-body">
                        <label>Nama Menu</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
                        <label className='my-3'>Deskripsi</label>
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <label className='my-3'>Harga</label>
                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        <label className='my-3'>Tipe</label>
                        <select className='form-control custom-select' value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="" disabled>Pilih tipe..</option>
                            <option value="Makanan">Makanan</option>
                            <option value="Minuman">Minuman</option>
                        </select>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => onSubmitForm(e)}>Save</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {
                            setName("");
                            setDescription("");
                            setPrice("");
                            setType("Pilih tipe..")
                        }}>Close</button>
                    </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MenuInput;

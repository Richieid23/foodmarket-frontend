import React, { Fragment, useEffect, useState } from 'react';
import MenuEdit from './MenuEdit';

const MenuList = () => {

    const [menus, setMenus] = useState([]);

    const getMenus = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/menu");
            const jsonData = await response.json();
            setMenus(jsonData.data.menus);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getMenus();
    }, []);

    const deleteMenu = async(id) => {
        try {
            await fetch(`http://localhost:5000/api/menu/${id}`, {
                method: 'DELETE'
            });

            setMenus(menus.filter((menu) => menu.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className='list-group mt-3'>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr className='bg-primary'>
                        <th scope="col">Menu</th>
                        <th scope="col">Nama Menu</th>
                        <th scope="col">Deskripsi</th>
                        <th scope="col">Harga</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu) => {
                            return (
                                <tr key={menu.id}>
                                    <th>{menu.type}</th>
                                    <td>{menu.name}</td>
                                    <td>{menu.description}</td>
                                    <td>{menu.price}</td>
                                    <td>
                                        <MenuEdit menu={menu} />
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => deleteMenu(menu.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default MenuList;
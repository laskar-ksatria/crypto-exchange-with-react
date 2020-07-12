import React from 'react';

function MultiState() {

    const [state, setState] = React.useState([]);
    const [listItem, setListItem] = React.useState([]);

    const getCount = (type) => {
        let count = state.length;
        if(count === 0) {
            if(type === 'plus') {
                setState([{id: 0, title: "", description: ""}])
            }
        }else {
            if(type === 'plus') {
                setState([...state, {id: state.length, title: "", description: ""}])
            }else if (type === 'minus') {
                let newState = [];
                let limit = state.length - 1;
                state.forEach(item => {
                    if (item.id < limit) {
                        newState.push(item)
                    }
                })
                setState(newState)
            }
        }
    };


    const handleChange = (e, id) => {
        let newState = [];
        state.forEach(item => {
            if (item.id === id) {
                item[`${e.target.name}`] = e.target.value
            }
            newState.push(item)
        });
        setState(newState)
    }

    const getListItem = () => {
        let newState = [];
        state.forEach(item => {
            if (item.title !== "" && item.description !== "") {
                newState.push(item)
            }
        })
        console.log(newState)
        setListItem(newState)
    }

    return (
        <div>
            <h1>Dynamic State</h1>
            <button type="button" onClick={() => getCount('plus')}>Tambah</button>
            <button type="button" onClick={() => getCount('minus')}>Kurang</button>
            <hr/>
            {state.map(item => {
                if (item) {
                    return (
                        <div key={item.id}>
                            <input type="text" name="title" placeholder="Title" onChange={e => handleChange(e, item.id)} />
                            <input placeholder="Description" type="text" name="description" onChange={e => handleChange(e, item.id)} />
                        </div>
                    )
                }else {
                    return ""
                }
            })}
            <br />
            <button type="button" onClick={getListItem}>Save</button>
            <hr />
            {listItem.map((item, index) => {
                return (
                    <div key={item.id}>
                        <h3>{index + 1 }. {item.title}: {item.description}</h3>
                    </div>
                )
            })}
        </div>
    )

};

export default MultiState;
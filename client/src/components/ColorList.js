import React, { useState } from 'react';
import axiosWithAuth from '../authorization/AxiosWithAuth';
import { useHistory } from 'react-router-dom';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors, fetchColors }, props) => {
  console.log(colors);
  const { push } = useHistory();
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [moreColors, setMoreColors] = useState({
    color: '',
    code: { hex: '' },
  });

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    console.log(colorToEdit);
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        fetchColors();
        console.group(res);
      })
      .catch((err) => console.log('Error saving color', err));
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        updateColors([...colors]);
        window.location.reload();
      })
      .catch((err) => console.log('Error deleting color', err));
  };

  const addColor = (e) => {
    e.preventDefault();
    console.log(moreColors);
    axiosWithAuth()
      .post('/colors', moreColors)
      .then((res) => {
        axiosWithAuth()
          .get('/colors')
          .then((res) => {
            updateColors(res.data);
          })
          .catch((err) => {
            console.log(res.data.payload);
          })
          .catch((err) => {
            console.log('Error adding color', err);
          });
      });
  };

  const handleChange = (e) => {
    setMoreColors({ ...moreColors, color: e.target.value });
  };
  const hexChange = (e) => {
    setMoreColors({ ...moreColors, code: { hex: e.target.value } });
  };

  return (
    <div className="colors-wrap">
      <p>Colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                X
              </span>
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit Color</legend>
          <label>
            Color Name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form onSubmit={addColor}>
        <legend>Add More Colors</legend>
        <label>
          Color Name
          <input type="text" name="new color" onChange={handleChange} />
        </label>
        <label>
          Hex Code
          <input type="text" name="hex code" onChange={hexChange} />
        </label>
        <button className="Add">Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;

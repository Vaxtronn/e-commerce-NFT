import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateNft.css";
import "../NFTCard/NFTCard.css";
import PreviewNft from "./PreviewNft/PreviewNft";
import * as actions from "../../redux/actions";
import { useEffect, useRef } from "react";

export function validate(input) {
  let errors = {
    name: "no data",
    price: "no data",
  };

  if (!/([A-Z])/.test(input.name))
    errors = { ...errors, name: "Username is invalid" };
  else errors = { ...errors, name: "Name is correct" };

  if (input.price <= 0)
    errors = { ...errors, price: "Price can not be 0 or less" };
  else errors = { ...errors, price: "Price is correct" };

  return errors;
}

export default function Form() {
  useEffect(() => {
    dispatch(actions.getAllCollections());
  }, []);

  const dispatch = useDispatch();

  const allCollections = useSelector((state) => state.collections);

  // cloudinary >>>
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    console.log(cloudinaryRef.current);
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dwyhztlkw",
        uploadPreset: "non_fungible_town",
      },
      function (error, result) {
        if (result.info.files) {
          let urlImg = result.info.files[0].uploadInfo.secure_url;
          console.log(result.info.files[0].uploadInfo.secure_url);
          setInput((prev) => ({ ...prev, image: urlImg }));
        }
      }
    );
  }, []);

  let handleUpload = (e) => {
    e.preventDefault();
    widgetRef.current.open();
  };
  // cloudinary <<<

  let [input, setInput] = React.useState({
    // 1er
    collection: "",

    // 2do
    name: "",
    description: "",
    image: "no image found",
    price: 0,

    // 3er
    categories: ["", "", "", "", "", "", ""],

    // autofill
    contract: "non-contract-yet",
    ownerName: "banx",
    ownerIcon: "",
  });

  const [errors, setErrors] = React.useState({
    name: "no data",
    price: "no data",
  });

  const [addCollection, setAddCollection] = React.useState({
    name: "",
    image:
      "https://images.pexels.com/photos/12786598/pexels-photo-12786598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });

  //asi tendria q venir el array de categories,puede cambiar como venga
  const allCategories = {
    species: ["Animal", "Humanoid", "Other"],
    species2: ["Cat", "Other"],
    art: ["Artist", "Other"],
    type: ["2d", "Other"],
    style: ["Urban", "Other"],
    rest: ["Adult", "Normal"],
    flat: ["Flat", "Other"],
  };

  // COLLECTIONS FUNCTIONS
  let selectCollection = (e) => {
    e.preventDefault();
    setInput((prev) => ({
      ...prev,
      collection: e.target.value,
    }));
  };

  let inputCollections = (e) => {
    e.preventDefault();
    setAddCollection((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  let submitAddCollection = (e) => {
    e.preventDefault();
    dispatch(actions.createCollection(addCollection));
  };

  // INPUTS FUNCTIONS
  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  // CATEGORIES FUNCTIONS
  let handleChangeSelect = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[0] = e.target.value;
    setInput((prev) => ({
      ...prev,
      categories: auxCats,
    }));
  };

  let handleChangeSelect1 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[1] = e.target.value;
    setInput((prev) => ({
      ...prev,
      categories: auxCats,
    }));
  };

  let handleChangeSelect2 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[2] = e.target.value;
    setInput((prev) => ({
      ...prev,
      categories: auxCats,
    }));
  };

  let handleChangeSelect3 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[3] = e.target.value;
    setInput((prev) => ({
      ...prev,
      categories: auxCats,
    }));
  };

  let handleChangeSelect4 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[4] = e.target.value;
    setInput((prev) => ({
      ...prev,
      categories: auxCats,
    }));
  };

  let handleChangeSelect5 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[5] = e.target.value;
    setInput((prev) => ({
      ...prev,
      categories: auxCats,
    }));
  };

  let handleChangeSelect6 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[6] = e.target.value;
    setInput((prev) => ({
      ...prev,
      categories: auxCats,
    }));
  };

  // CREATE NFT
  let handleSubmit = (e) => {
    e.preventDefault();
    let inputObj = {
      ...input,
      price: Number(input.price),
    };
    dispatch(actions.createNft(inputObj));
  };

  // --- NEXT - PREV ---
  const [createStep, setCreateStep] = useState(1);

  const next = (e) => {
    e.preventDefault();
    setCreateStep(createStep + 1);
  };

  const back = (e) => {
    e.preventDefault();
    setCreateStep(createStep - 1);
  };

  // const restart = (e) => {
  //   e.preventDefault();
  //   setCreateStep(1);
  // };

  return (
    <React.Fragment>
      <div className="mainContainer">
        <fieldset
          className={`info-fieldset ${
            createStep !== 1 ? "noneDisplay" : "first-field-collections"
          }`}
        >
          <div className="inputContainer">
            <div className="divs-separet">
              <h3>Collection</h3>
              <h5>This is the collection where your item will appear.</h5>
            </div>

            <div className="divs-separet">
              <h6>Create a new collection.</h6>
              <input
                type="text"
                name="collection"
                value={addCollection.name}
                onChange={(e) => inputCollections(e)}
              />
              <button onClick={(e) => submitAddCollection(e)}>Create</button>
            </div>

            <div className="divs-separet">
              <h6>Choose the collection in which your nft will be created.</h6>
              <select onChange={(e) => selectCollection(e)} name="collections">
                <option hidden disabled selected value>
                  {" "}
                  Select collection{" "}
                </option>
                {allCollections?.map((e) => (
                  <option value={e.name} name="collections" key={e.name}>
                    {e.name} | {e.nfts.length} items
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* {allCollections?.map((e) => (
            <div className="flex-row2" onClick={(e) => selectCollection(e)}>
              <h5>{e.name}</h5>
              <h5>{e.nfts.length} items</h5>
            </div>
          ))} */}
          <div className="buttons-next-prev">
            <button
              className="button-next"
              onClick={next}
              disabled={input.collection === ""}
            >
              {" "}
              next{" "}
            </button>
          </div>
        </fieldset>

        <fieldset
          className={`info-fieldset ${createStep !== 2 ? "noneDisplay" : ""}`}
        >
          <div className="flex-row2">
            <div className="first-field-collections">
              <form className="createNft">
                <div className="inputContainer">
                  <h5>Name</h5>
                  <div className="inputAndErrorsMsg">
                    <input
                      type={"text"}
                      name={"name"}
                      value={input.name}
                      onChange={(e) => handleChange(e)}
                      placeholder={"NFTs name..."}
                    />
                    <p
                      className={
                        errors.name === "Name is correct"
                          ? "greenMsg"
                          : "redMsg"
                      }
                    >
                      {errors.name}
                    </p>
                  </div>
                </div>

                <div className="inputContainer">
                  <h5>Image, video, audio or 3D model</h5>
                  <p>
                    {" "}
                    File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3,
                    WAV, OGG, GLB, GLTF. Max size: 100 MB{" "}
                  </p>
                  <button
                    className="upload-file"
                    onClick={(e) => handleUpload(e)}
                  >
                    Upload
                  </button>
                </div>

                <div className="inputContainer">
                  <h5>Description</h5>
                  <p>
                    {" "}
                    The description will be included on the item's detail page
                    below its image.{" "}
                  </p>
                  <input
                    type={"text"}
                    name={"description"}
                    value={input.description}
                    onChange={(e) => handleChange(e)}
                    placeholder={"this NFT its about..."}
                  />
                </div>

                <div className="inputContainer">
                  <h5>Price</h5>
                  <p>Put the price only in Ethereum</p>
                  <div className="inputAndErrorsMsg">
                    <input
                      type={"number"}
                      name={"price"}
                      value={input.price}
                      onChange={(e) => handleChange(e)}
                    />
                    <p
                      className={
                        errors.price === "Price is correct"
                          ? "greenMsg"
                          : "redMsg"
                      }
                    >
                      {errors.price}
                    </p>
                  </div>
                </div>
              </form>
            </div>

            <div className="rigth-side">
              <div className="ilustration-validations">
                <div className="ilustrationContainer">
                  <h2>Nft preview</h2>
                  <PreviewNft
                    image={input.image}
                    name={input.name}
                    price={input.price}
                    tokenId={input.tokenId}
                  />
                </div>
              </div>

              <div className="buttons-next-prev">
                <button onClick={back}> back </button>
                <button
                  onClick={next}
                  disabled={
                    errors.name !== "Name is correct" ||
                    errors.price !== "Price is correct"
                  }
                >
                  {" "}
                  next{" "}
                </button>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset
          className={`info-fieldset ${
            createStep !== 3 ? "noneDisplay" : "first-field-collections"
          }`}
        >
          <div className="inputContainer">
            <h5>Category</h5>
            <p>
              {" "}
              Classify your nft from the following categories. You must select
              all of them or you will not be able to create the nft{" "}
            </p>

            <button className="addCategory"></button>

            <select onChange={(e) => handleChangeSelect(e)} name="categories">
              <option hidden disabled selected value>
                {" "}
                Specie{" "}
              </option>
              {allCategories.species.map((e) => (
                <option value={e} name="categories" key={e}>
                  {" "}
                  {e}{" "}
                </option>
              ))}
            </select>

            <select onChange={(e) => handleChangeSelect1(e)} name="categories">
              <option hidden disabled selected value>
                {" "}
                Specie2{" "}
              </option>
              {allCategories.species2.map((e) => (
                <option value={e} name="categories" key={e}>
                  {" "}
                  {e}{" "}
                </option>
              ))}
            </select>

            <select onChange={(e) => handleChangeSelect2(e)} name="categories">
              <option hidden disabled selected value>
                {" "}
                Art{" "}
              </option>
              {allCategories.art.map((e) => (
                <option value={e} name="categories" key={e}>
                  {" "}
                  {e}{" "}
                </option>
              ))}
            </select>

            <select onChange={(e) => handleChangeSelect3(e)} name="categories">
              <option hidden disabled selected value>
                {" "}
                Type{" "}
              </option>
              {allCategories.type.map((e) => (
                <option value={e} name="categories" key={e}>
                  {" "}
                  {e}{" "}
                </option>
              ))}
            </select>

            <select onChange={(e) => handleChangeSelect4(e)} name="categories">
              <option hidden disabled selected value>
                {" "}
                Style{" "}
              </option>
              {allCategories.style.map((e) => (
                <option value={e} name="categories" key={e}>
                  {" "}
                  {e}{" "}
                </option>
              ))}
            </select>

            <select onChange={(e) => handleChangeSelect5(e)} name="categories">
              <option hidden disabled selected value>
                {" "}
                Rest{" "}
              </option>
              {allCategories.rest.map((e) => (
                <option value={e} name="categories" key={e}>
                  {" "}
                  {e}{" "}
                </option>
              ))}
            </select>

            <select onChange={(e) => handleChangeSelect6(e)} name="categories">
              <option hidden disabled selected value>
                {" "}
                Flat{" "}
              </option>
              {allCategories.flat.map((e) => (
                <option value={e} name="categories" key={e}>
                  {" "}
                  {e}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className="ilustration-validations">
            <input
              className={
                errors.name === "Name is correct" &&
                errors.price === "Price is correct"
                  ? "submit"
                  : "errorSubmit"
              }
              type="submit"
              value={"Create NFT"}
              disabled={input.categories.includes("")}
              onClick={(e) => handleSubmit(e)}
            />
          </div>

          <div className="buttons-next-prev">
            <button onClick={back}> back</button>
          </div>
        </fieldset>
      </div>
    </React.Fragment>
  );
}

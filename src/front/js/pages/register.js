import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";

const Register = () => {
  const [characters, setCharacters] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    fetch(
      "https://3001-4geeksacade-reactflaskh-b0tpz12zern.ws-us47.gitpod.io/api/register",
      {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("Success:", response);
        Swal.fire("Registro Exitoso");
      })
      .catch((error) => console.error("Error:", error));

    console.log(data);
  };

  return (
    <div className="container w-50 ">
      <div className="row">
        <form className=" mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="fs-1 bg-white text-center">
            <h1> Register</h1>
          </div>
          <div className="">
            <div className="row pb-1">
              <div className="col">
                <label for="mail" className="form-label">
                  <b>Email</b>
                </label>
                <span class="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe tu email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    {...register("username", {
                      required: true,
                      pattern:
                        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <span
                      className="input-group-text bg-white border-start-0"
                      id="basic-addon1"
                    >
                      <AiFillCloseCircle className="fs-4 text-danger" />
                    </span>
                  )}
                </span>
              </div>
              {errors.email?.type === "pattern" && (
                <p>El formato de email no es valido</p>
              )}
              {errors.email?.type === "required" && (
                <p className="text-danger">
                  {" "}
                  email is required{" "}
                </p>
              )}
            </div>
            <div className="row pb-1">
              <div className="col">
                <label for="password" className="form-label">
                  <b>Password</b>
                </label>
                <span class="input-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Escribe tu contraseña"
                    id="exampleInputPassword1"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <span
                      className="input-group-text bg-white border-start-0"
                      id="basic-addon1"
                    >
                      <AiFillCloseCircle className="fs-4 text-danger" />
                    </span>
                  )}
                </span>
                {errors.password?.type === "required" && (
                  <p className="text-danger"> password is required </p>
                )}
              </div>
            </div>
            <div className="row pb-1">
              <div className="col">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" {...register("is_active")}/>
                    <label class="form-check-label" for="flexCheckDefault">
                        Terms and Conditions
                    </label>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="row d-md-flex gap-2">
              <button type="submit" className="btn btn-warning btn-lg mt-2">
                Register
              </button>
              <button type="reset" className="btn btn-warning btn-lg">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
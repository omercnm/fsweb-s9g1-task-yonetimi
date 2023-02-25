import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const TaskForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  function mySubmit(data) {
    toast(`${data.title} görevi eklendi`);
    console.log(data);
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
          type="text"
        />
        {<p className="input-error">{errors?.title?.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        {<p className="input-error">{errors?.description?.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                {...register("people", { required: "En az 1 kişi seçin" })}
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {<p className="input-error">{errors?.people?.message}</p>}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit">
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskForm;

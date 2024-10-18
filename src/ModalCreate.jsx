import { Form, Input, Modal, Select } from "antd";
import React from "react";
import "./App.css";
import { InputStyled } from "./styles";

export const ModalCreate = ({ showModal, cancel, addAttendes }) => {
  const [form] = Form.useForm();

  const createAttendes = (value) => {
    addAttendes(value)
    cancel()
  };

  return (
    <Modal
      onCancel={cancel}
      open={showModal}
      centered
      width={500}
      className="custom-modal "
      footer={false}
    >
      <div>
        <h3 style={{ color: "white" }}>Agregar asistente</h3>

        <Form form={form} onFinish={createAttendes} layout="vertical">
          <Form.Item name="name">
            <Input placeholder="nombre" />
          </Form.Item>
          <Form.Item name="level">
            <Select placeholder="Nivel">
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <button type="primary" htmlType="submit">
              Crear
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

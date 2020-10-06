/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { request } from "strapi-helper-plugin";

import { Container, Block } from "../../components/StrapiStyled";
import {InputText, Button, Padded} from '@buffetjs/core'
const HomePage = () => {
  const [pk, setPk] = useState("");
  useEffect(() => {
    const loadPk = async () => {
      const response = await request(`/${pluginId}/settings`, {
        method: "GET",
      });
      const { pk } = response;
      setPk(pk);
    };
    loadPk();
  }, []);

  const updatePk = async (e) => {
    try {
      e.preventDefault();
      strapi.lockApp()
      const response = await request(`/${pluginId}/settings`, {
        method: "POST",
        body: { pk },
      });
      strapi.notification.success('Success')
    } catch (error) {
      strapi.notification.error(err.toString())

    }
    strapi.unlockApp()
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <Container>
          <Block>
            <h1>Stripe</h1>
            <p>Save your private key here</p>
            <form onSubmit={updatePk}>
              <InputText
                style={{
                  border: "1px black",
                }}
                value={pk}
                onChange={(e) => setPk(e.target.value)}
                name="input"
                type="password"
                placeholder="Stripe Private Key"
              />
              <Padded
              top
              >
              <Button color="primary" label="Submit" />
              </Padded>
            </form>
          </Block>
        </Container>
      </div>
    </div>
  );
};

export default memo(HomePage);

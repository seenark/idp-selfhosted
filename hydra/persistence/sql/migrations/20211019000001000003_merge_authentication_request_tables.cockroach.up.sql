-- Migration generated by the command below; DO NOT EDIT.
-- hydra:generate hydra migrate gen

ALTER TABLE ONLY hydra_oauth2_flow ADD CONSTRAINT hydra_oauth2_flow_pkey PRIMARY KEY (login_challenge);
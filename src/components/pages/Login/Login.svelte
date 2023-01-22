<script lang="ts">
  import { Form, Input, Button } from "szot-ui-experimental";
  import Card from "../../Card/Card.svelte";
  import { validEmail } from "./loginFunctions";

  const loginData = {
    email: "",
    password: "",
  };

</script>

<div class="container">
  <Card>
    <header>
      <h1>Login</h1>
    </header>

    <div class="form">
      <Form on:submit>
        <Input
          name="email"
          label="Email"
          type="email"
          bind:value={loginData.email}
          validationFn={validEmail}
        />
        <Input
          name="senha"
          label="Senha"
          type="password"
          bind:value={loginData.password}
        />
        <Button type="submit" buttonStyleType="filled">Entrar</Button>
      </Form>
    </div>

    <a href="http://google.com">Cadastre-se</a>
  </Card>
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    --szot-input-border-color: red;
    --szot-input-border-color-focus: red;
    --szot-input-label-color: black;
    --szot-input-border-radius: 1.5rem;
    --szot-input-border: 0.125rem;
    --szot-input-placeholder-color: gray;
    --szot-input-padding: 1rem;
    --szot-input-label-padding: 0.3125rem;
    --szot-button-color: black;
    --szot-button-background-color: rgba(105, 23, 105, 0.616);
    --szot-button-border-radius: 1.5rem;

    header {
      padding: 1.5rem 0;
    }

    .form {
      min-width: 31.25rem;
      min-height: 31.25rem;
    }

  }
</style>

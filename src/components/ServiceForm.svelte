<script>
  import { createEventDispatcher, onMount } from 'svelte';
  
  export let service = null;

  let name = '';
  let description = '';
  let price = '';
  let initialized = false;

  onMount(() => {
    initializeForm();
  });

  $: if (service && !initialized) {
    initializeForm();
  }

  function initializeForm() {
    if (service) {
      name = service.name;
      description = service.description;
      price = service.price.toString();
    } else {
      resetForm();
    }
    initialized = true;
  }

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    if (!name || !description || !price) {
      alert('All fields are required');
      return;
    }

    dispatch('submit', { 
      id: service ? service.id : null,
      name, 
      description, 
      price: parseFloat(price) 
    });

    resetForm();
  }

  function resetForm() {
    name = '';
    description = '';
    price = '';
    service = null;
    initialized = false;
  }

  function handleCancel() {
    dispatch('cancel');
    resetForm();
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={name} placeholder="Service Name" required>
  <textarea bind:value={description} placeholder="Description" required></textarea>
  <input type="number" bind:value={price} placeholder="Price" step="0.01" required>
  <div class="button-group">
    <button type="submit">{service ? 'Update' : 'Add'} Service</button>
    {#if service}
      <button type="button" on:click={handleCancel}>Cancel</button>
    {/if}
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 0 auto;
    margin-bottom: 20px;
    max-width: 400px;
    width: 100%;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  input, textarea {
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  button {
    padding: 10px 15px;
    background-color: #0d6efd;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.15s ease-in-out;
  }

  button:hover {
    background-color: #0b5ed7;
  }

  button[type="button"] {
    background-color: #6c757d;
  }

  button[type="button"]:hover {
    background-color: #5c636a;
  }

  .button-group {
    display: flex;
    gap: 10px;
  }
</style>
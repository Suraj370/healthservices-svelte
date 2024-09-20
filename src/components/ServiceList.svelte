<script>
  import { services } from '../store/store.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function editService(service) {
    dispatch('edit', service);
  }

  function deleteService(id) {
    services.update(svcs => svcs.filter(s => s.id !== id));
  }
</script>

<ul class="service-list">
  {#each $services as service (service.id)}
    <li class="service-item">
      <div class="service-info">
        <h3 class="service-name">{service.name}</h3>
        <p class="service-description">{service.description}</p>
        <p class="service-price">Price: ${service.price.toFixed(2)}</p>
      </div>
      <div class="service-actions">
        <button class="btn btn-edit" on:click={() => editService(service)}>Edit</button>
        <button class="btn btn-delete" on:click={() => deleteService(service.id)}>Delete</button>
      </div>
    </li>
  {/each}
</ul>

<style>
  .service-list {
    list-style-type: none;
    padding: 0;
    max-width: 600px;
    margin: 0 auto;
  }

  .service-item {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }

  .service-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .service-name {
    font-size: 1.4em;
    margin: 0 0 10px 0;
    color: #333;
  }

  .service-description {
    font-size: 1em;
    color: #666;
    margin-bottom: 10px;
  }

  .service-price {
    font-size: 1.1em;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 15px;
  }

  .service-actions {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
  }

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s ease;
  }

  .btn-edit {
    background-color: #3498db;
    color: white;
  }

  .btn-edit:hover {
    background-color: #2980b9;
  }

  .btn-delete {
    background-color: #e74c3c;
    color: white;
  }

  .btn-delete:hover {
    background-color: #c0392b;
  }

  @media (max-width: 600px) {
    .service-item {
      padding: 15px;
    }

    .service-name {
      font-size: 1.2em;
    }

    .service-description,
    .service-price {
      font-size: 0.9em;
    }

    .btn {
      padding: 6px 12px;
      font-size: 0.8em;
    }
  }
</style>
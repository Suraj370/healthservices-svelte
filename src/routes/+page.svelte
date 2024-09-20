<script>
  import ServiceList from '../components/ServiceList.svelte';
  import ServiceForm from '../components/ServiceForm.svelte';

  import { services } from '../store/store.js';

   let editingService = null;

  function handleEdit(event) {
    console.log(event.detail)
    editingService = { ...event.detail };
  }

  function handleServiceSubmit(event) {
    const { id, name, description, price } = event.detail;
    if (id) {
      services.update(svcs => 
        svcs.map(s => s.id === id ? { ...s, name, description, price } : s)
      );
    } else {
      services.update(svcs => [...svcs, { id: Date.now(), name, description, price }]);
    }
    editingService = null;
  }

  function handleCancel() {
    editingService = null;
  }
</script>

<main>
  <h1>Healthcare Services</h1>
  <ServiceForm 
    service={editingService} 
    on:submit={handleServiceSubmit} 
    on:cancel={handleCancel} 
  />
  <ServiceList on:edit={handleEdit} />
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
</style>
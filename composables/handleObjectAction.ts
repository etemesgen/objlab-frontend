export async function handleObjectAction(id: any, event: Event, type: string, apiUrl: string, toast: any, image: Ref<string>) {
  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData);

  if (!image.value && type === 'add') {
    toast.add({
      title: 'Erreur',
      description: 'Veuillez sélectionner une image.',
      icon: 'i-heroicons-x-circle',
      color: 'gray',
      timeout: 0
    });
    return;
  }

  data.image = image.value;

  await $fetch(`${apiUrl}/api/v1/objects${type === 'add' ? '' : `/${id}`}`, {
    method: type === 'add' ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(() => {
    toast.add({
      title: `Objet ${type === 'add' ? 'ajouté' : 'modifié'}`,
      description: `L'objet a été ${type === 'add' ? 'ajouté' : 'modifié'} avec succès.`,
      icon: 'i-heroicons-check-circle',
      color: 'gray',
      timeout: 0
    });
  })
  .catch(() => {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue.',
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 0
    });
  });
}
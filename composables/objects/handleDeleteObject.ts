export async function handleDeleteObject(id: any, apiUrl: string, toast: any) {
  await $fetch(`${apiUrl}/api/v1/objects/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(() => {
    toast.add({
      title: 'Objet supprimé',
      description: 'L\'objet a été supprimé avec succès.',
      color: 'gray',
      timeout: 0
    });
  })
  .catch(() => {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de la suppression de l\'objet.',
      color: 'red',
      timeout: 0
    });
  });
}
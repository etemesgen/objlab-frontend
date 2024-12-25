export default async function handleUserSignin(event: Event, apiUrl: any, toast: any) {
  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData);

  await $fetch(apiUrl + '/api/v1/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response: any) => {
    localStorage.setItem('user', JSON.stringify(response.authenticatedUser))
    navigateTo('/dashboard')
  }).catch(() => {
    toast.add({
      title: 'Erreur',
      description: 'Email ou mot de passe incorrect',
      icon: 'i-heroicons-x-circle',
      color: 'red'
    })
  });
}
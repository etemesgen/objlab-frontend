export default async function handleUserSignup(event: Event, apiUrl: any) {
  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData);

  await $fetch(apiUrl + '/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
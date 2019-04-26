export const fetchUsers = () => (
  $.ajax({
    method: 'GET',
    url: `api/users`,
  })
);

export const fetchUser = (userId, tripId) => (
  $.ajax({
    method: 'GET',
    url: `api/users/${userId}/trips/${tripId}`
  })
);

export const createUser = (userForm) => (
  $.ajax({
    method: 'POST',
    url: `api/users`,
    data: userForm,
    contentType: false,
    processData: false
  })
);

export const updateUser = (userId, userForm) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${userId}`,
    data: userForm,
    contentType: false,
    processData: false,
  })
);

export const destroyUser = (userId) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/users/${userId}`
  })
);
export const fetchTrips = userId => (
  $.ajax({
    method: 'GET',
    url: `api/users/${userId}/trips`,
  })
);

export const fetchTrip = (userId, tripId) => (
  $.ajax({
    method: 'GET',
    url: `api/users/${userId}/trips/${tripId}`
  })
);

export const createTrip = (userId, tripForm) => (
  $.ajax({
    method: 'POST',
    url: `api/users/${userId}/trips`,
    data: tripForm,
    contentType: false,
    processData: false
  })
);

export const updateTrip = (userId, tripId, tripForm) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${userId}/trips/${tripId}`,
    data: tripForm,
    contentType: false,
    processData: false,
  })
);

export const destroyTrip = (userId, id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/users/${userId}/trips/${id}`
  })
);

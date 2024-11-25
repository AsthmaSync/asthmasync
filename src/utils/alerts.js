import Swal from 'sweetalert2';

export const showSuccessAlert = (message) => {
    Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        confirmButtonColor: '#06b6d4',
        timer: 2000
    });
};

export const showErrorAlert = (message) => {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonColor: '#06b6d4'
    });
};

export const showDeleteConfirmation = () => {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#06b6d4',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes, delete it!'
    });
}; 
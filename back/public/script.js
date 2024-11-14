document.addEventListener("DOMContentLoaded", () => {
    const booksList = document.getElementById('booksList');
    const paginationContainer = document.getElementById('pagination');
    let currentPage = 1;
    const limit = 5;

    async function fetchBooks(page = 1) {
        try {
            const response = await fetch(`/api/books/${page}/${limit}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des livres');
            }
            const { books, totalBooks } = await response.json();
            displayBooks(books);
            updatePagination(page, totalBooks);
            return { books, totalBooks };
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    function displayBooks(books) {
        booksList.innerHTML = '';

        books.forEach(book => {
            addBookToList(book);
        });
    }
 
    function addBookToList(book) {
        const listItem = document.createElement('li');
        listItem.textContent = book.title;

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('bookDetails');
        detailsDiv.style.display = 'none';

        listItem.addEventListener('click', async () => {
            try {
                const response = await fetch(`/api/books/${book._id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des détails du livre');
                }
                const details = await response.json();
                detailsDiv.innerHTML = `
                    <p><strong>Auteur:</strong> ${details.author}</p>
                    <p><strong>Date de publication:</strong> ${new Date(details.publicationYear).getFullYear()}</p>
                `;
                detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
            } catch (error) {
                console.error('Erreur:', error);
            }
        });

        listItem.appendChild(detailsDiv);
        booksList.appendChild(listItem);
    }

    function updatePagination(page, totalBooks) {
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(totalBooks / limit);

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Précédent';
        prevButton.disabled = page <= 1;
        prevButton.addEventListener('click', () => {
            currentPage = page - 1;
            fetchBooks(currentPage);
        });
        paginationContainer.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Suivant';
        nextButton.disabled = page >= totalPages;
        nextButton.addEventListener('click', () => {
            currentPage = page + 1;
            fetchBooks(currentPage);
        });
        paginationContainer.appendChild(nextButton);
    }

    function showModal() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';

        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
    }

    document.getElementById('bookForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            publicationYear: document.getElementById('publicationYear').value
        };

        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                document.getElementById('bookForm').reset();

                currentPage = Math.ceil((await fetchBooks(currentPage)).totalBooks / limit);
                fetchBooks(currentPage);
                showModal();
            } else {
                alert('Erreur lors de l\'ajout du livre');
            }
        } catch (error) {
            alert('Erreur de connexion : ' + error.message);
        }
    });

    fetchBooks(currentPage);
});

$(function() {
    
    //Cache DOM
    var $orders = $('#orders');
    var $email = $('#email');
    var $password = $('#password');
    var $loginMessage = $('#loginMessage');
    var $bookAdded = $('#bookAdded');

    $('#login').on('click', function() {

        var user = {
            email: $email.val(),
            password: $password.val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users/login',
            data: user,
            success: function(user) {
                console.log('Login successful');
                localStorage.setItem('token', user.token);
                $loginMessage.html('');
                $loginMessage.append('<p style="color:green">Login Successful!</p>');
            },
            error: function() {
                console.log('Auth failed');
                $loginMessage.html('');
                $loginMessage.append('<p style="color:red">Auth failed!</p>');
            }

        });
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products/',
        success: function(data) {
            $.each(data.products, function(i, products) {
                $orders.append('<li>Title: '+ products.name + ', Price: $'+ products.price+'</li>');
            });
        },
        error: function() {
            alert('Error loading products.');
        }
    });

    $('#orderForm').on('submit', function(event) {
        event.preventDefault()
        var formData = new FormData(this);

        $.ajax({
            url: 'http://localhost:3000/products/',
            type: 'POST',
            crossDomain: true,
            processData: false,
            contentType: false,
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            data: formData,
            success: function(data) {
                $orders.append('<li>Title: '+ newOrder.name + ', Price: $'+ newOrder.price+'</li>');
                $bookAdded.html('');
                $bookAdded.append('<p style="color:green">Book added!</p>');
            },
            error: function(error) {
                console.log(error);
                $bookAdded.html('');
                $bookAdded.append('<p style="color:red">There was an error!</p>');
            }

        });
    });
});

export default `
      <div>
        <form class="my-form" method="POST" data-netlify="true" name="contact">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" placeholder="Full Name" />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@somewhere.com"
            />
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="tel" name="fone" id="fone" />
          </div>
          <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" name="age" value="21" />
          </div>
          <div class="form-group">
            <label for="msg">Enter your message:</label>
            <textarea name="msg" id="msg" cols="100" rows="10"></textarea>
          </div>
          <button class="btn" type="submit">Submit</button>
        </form>
      </div>
`;

type User = {
  username: string;
  password: string;
};

type Guest = {
  sessionId: string;
};

type Admin = {
  role: 'admin';
  username: string;
  password: string;
};

type ExternalUser = {
  oauthToken: string;
};

function login(entity: Admin | Guest | ExternalUser | User) {
  if ('role' in entity) {
    console.log('You are logged in as an administrator.');
  } else if ('sessionId' in entity) {
    console.log(
      'You are logged in as a guest. Guest activity will be erased when you log out'
    );
  } else if ('oauthToken' in entity) {
    console.log(
      'External user has been added as member to workspace through an invitation email.'
    );
  } else console.log('You are logged in as an user.');
}

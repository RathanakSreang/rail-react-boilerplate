Rails.application.routes.draw do
  # post "/login", to: "users#login"
  # get "/auto_login", to: "users#auto_login"
  post "signin", to: "auth#signin"
  post "register", to: "auth#register"
  post "forget_password", to: "auth#forget_password"
  post "reset_pasword", to: "auth#reset_pasword"
  post "confirm_account", to: "auth#confirm_account"
  post "refresh_token", to: "auth#refresh_token"
  # delete "signout", to: "users#signout"
  get "my_account", to: "users#my_account"
  resource :users, only: [:create] do
    put "update_profile"
    post "update_pasword"
  end
end

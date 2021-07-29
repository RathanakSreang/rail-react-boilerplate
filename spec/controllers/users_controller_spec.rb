require "rails_helper"

RSpec.describe UsersController, type: :controller do
  describe "GET #my_account" do
    context "authorized user" do
      let!(:user) {FactoryBot.create :user}
      let!(:access_token) {user.generate_auth}
      before :each do
        authentication_token access_token[:token]
        get :my_account, params: {}, format: :json
      end
      it "returns user detail info" do
        expect(response).to be_successful
        expect(json_body.keys).to match_array(["user"])
        expect(json_body["user"].keys).to match_array(["id", "name", "email"])
        expect(json_body["user"]["id"]).to eq(user.id)
      end
    end

    context "unauthorized user" do
      before :each do
        get :my_account, params: {}, format: :json
      end
      it "returns fail" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end

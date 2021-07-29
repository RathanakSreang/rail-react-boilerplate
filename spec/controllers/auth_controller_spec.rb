require "rails_helper"

RSpec.describe AuthController, type: :controller do
  describe "POST #signin" do
    let!(:user) {FactoryBot.create :user}
    let(:params) {{}}
    before :each do
      post :signin, params: params, format: :json
    end

    context "signin success" do
      let(:params) {{email: user.email, password: "1234567890"}}

      it "returns user info" do
        expect(response).to be_successful
        expect(json_body.keys).to match_array(["user", "auth"])
        expect(json_body["user"]["id"]).to eq(user.id)
        expect(json_body["user"].keys).to match_array(["id", "name", "email"])
      end

      it "returns user access token" do
        expect(response).to be_successful
        expect(json_body["auth"]["token"]).not_to be_empty
      end
    end

    context "signin fail" do
      let(:params) {{email: user.email, password: "incorrect"}}
      it "returns unprocessable_entity" do
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_body["errors"]).not_to be_empty
        expect(json_body["errors"]).to eq("Invalid email or password.")
      end
    end
  end

  describe "POST #register" do
    let(:params) {{}}
    before :each do
      post :register, params: params, format: :json
    end
    context "register success" do
      let(:params) {{name: "Awesome", email: "awesome@test.com", password: "1234567890"}}
      it "returns user info and access token" do
        expect(response).to be_successful
        expect(json_body.keys).to match_array(["user", "auth"])
        expect(json_body["user"].keys).to match_array(["id", "name", "email"])
        expect(json_body["auth"]["token"]).not_to be_empty
        expect(json_body["user"]["email"]).to eq("awesome@test.com")
      end
    end

    context "register fail" do
      context "missing require field" do
        let(:params) {{name: "Awesome"}}

        it "returns bad_request with errors fields" do
          expect(response).to have_http_status(:bad_request)
          expect(json_body["errors"]).to eq("Invalid email or password.")
        end
      end
    end
  end
end

require "spec_helper"

module SpecTestHelper
  def authentication_token access_token
    @request.headers["Authorization"] = "Baser " + access_token
  end

  def json_body
    JSON.parse response.body
  end

end

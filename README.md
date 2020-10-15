# Sofy_ASW_Action

This action uploads your azure_static_website to your Sofy Account to perform tests upon push.

## Inputs

### `website_url`

**Required** The url endpoint of your website. Default `""`.

### `application_guid`

**Required** ApplicationGUID retrieved from SOFY for Web `""`.

### `application_id`

**Required** ApplicationID retrieved from SOFY for Web `""`.

## Outputs

### `time`

The time we created the run you.

## Example usage

uses: actions/#Sofy_ASW_Action@v1.1
with:
  website_url: 'https://www.ebay.com'
  application_guid: <GUID Obtained from Sofy>
  application_id: '<APPID Obtained from Sofy>

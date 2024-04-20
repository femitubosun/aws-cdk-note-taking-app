## Scenario: Secure Note-Taking Service

### Overview

You are tasked with designing a secure note-taking service. The service allows authenticated users to create, read, and search within their notes. Each note can be considered a simple document containing text.

### Implementation

- **AWS Services**: You should use AWS IAM for authentication and authorization. Notes should be stored in AWS DynamoDB and AWS S3, depending on their content size. Utilize AWS Lambda functions for implementing logic (for example, creating, fetching, and searching for notes). Feel free to use other AWS services you find appropriate.
- **Deployment**: Deploy the solution using AWS CDK, CDK for Terraform, Pulumi, or SST.

### Functional Requirements

### Authentication and Authorization

- Only authenticated IAM users can create, read, and search their notes.
- Implement fine-grained access control ensuring users can only access their notes.

### Note Creation

- Provide an API endpoint `POST /notes/create` that accepts text content. Large notes (>6KB) must be stored in an S3 bucket, while others can be stored in DynamoDB.
- Ensure the storage choice (S3 vs. DynamoDB) is transparent to the API consumer.

### Note Fetching

- Support fetching a single note via `GET /notes/{noteId}`.
- Ensure secure access to S3-stored notes when requested, generating pre-signed URLs for temporary access.

### Searching Notes

- Implement a `GET /search?query=some+search+terms` endpoint.
    - The search should cover all user's notes and return results containing any of the search terms.
- Consider using Amazon Elasticsearch Service or DynamoDB's search capabilities for implementing efficient search.

### Bonus:

1. Configure a custom domain for the API using Amazon Route 53.
2. Add API rate limiting to prevent abuse.
3. Implement a caching mechanism for frequently accessed notes.

### Additional Considerations

- Ensure all data is encrypted in transit and at rest.
- Optimize the Lambda functions for cost and performance.
- Include meaningful error handling and validation in your API endpoints.
- Consider how to manage and rotate any used credentials or keys securely.
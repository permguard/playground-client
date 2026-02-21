// Copyright 2024 Nitro Agility S.r.l.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from "next";
import { AZClient, withEndpoint } from "@permguard/permguard";

/**
 * API handler for Permguard authorization checks.
 * @param req - The incoming Next.js API request.
 * @param res - The Next.js API response object.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse the JSON payload from the request
    const jsonRequest = req.body;

    // Validate that the payload is a valid object
    if (!jsonRequest || typeof jsonRequest !== "object") {
      return res.status(400).json({ error: "Invalid JSON payload" });
    }

    // Extract server url and server port from the request, default to localhost:9094
    const serverUrl =
      jsonRequest.url && typeof jsonRequest.url === "string"
        ? jsonRequest.url
        : "localhost";
    const serverPort =
      jsonRequest.port && typeof jsonRequest.port === "number"
        ? jsonRequest.port
        : 9094;

    // Create a new Permguard client with the specified or default endpoint
    const azClient = new AZClient(withEndpoint(serverUrl, serverPort));

    console.log({ serverUrl, serverPort });

    // Remove server url and server port from the payload to avoid sending them to Permguard
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { url: _, port: __, ...permguardPayload } = jsonRequest;

    // Check the authorization using the Permguard client
    const response = await azClient.check(permguardPayload);

    if (!response.response) {
      return res
        .status(503)
        .json({ error: "Permguard Permguard Server does not exist or is unreachable" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error processing Permguard request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

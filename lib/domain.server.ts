import type { DomainContext } from './domain'

/**
 * getDomainContext()
 * Always returns 'org' as the main canonical domain.
 */
export async function getDomainContext(): Promise<DomainContext> {
  return "org"
}

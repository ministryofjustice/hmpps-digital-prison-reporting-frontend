import { DprClientClass } from './DprClientClass'

abstract class PollingClientClass extends DprClientClass {
  protected polling = false

  protected pollingTimer: number | null = null

  protected POLLING_INTERVAL = 3000

  protected csrfToken!: string

  protected TERMINAL_STATUSES = ['FINISHED', 'EXPIRED', 'FAILED', 'ABORTED']

  protected startPolling(tick: () => Promise<void>, shouldStop: () => boolean) {
    const run = async () => {
      await tick()

      if (shouldStop()) {
        this.stopPolling()
        return
      }

      this.pollingTimer = window.setTimeout(run, this.POLLING_INTERVAL)
    }

    run()
  }

  protected stopPolling() {
    if (this.pollingTimer !== null) {
      clearTimeout(this.pollingTimer)
      this.pollingTimer = null
    }
  }

  protected isTerminalStatus(status: string | null): boolean {
    return status !== null && this.TERMINAL_STATUSES.includes(status)
  }

  protected getStatusFromElement(el: HTMLElement): string | null {
    return el.getAttribute('data-status')
  }

  protected isTerminalElement(el: HTMLElement): boolean {
    return this.isTerminalStatus(this.getStatusFromElement(el))
  }
}

export { PollingClientClass }
export default PollingClientClass
